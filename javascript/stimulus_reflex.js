import { Controller } from 'stimulus'
import { defaultSchema } from './schema'
import { dispatchLifecycleEvent } from './lifecycle'
import { uuidv4, serializeForm } from './utils'
import { elementToXPath } from './utils'
import { beforeDOMUpdate, afterDOMUpdate, serverMessage } from './callbacks'
import {
  registerReflex,
  getReflexRoots,
  setupDeclarativeReflexes
} from './reflexes'
import {
  attributeValues,
  extractElementAttributes,
  extractElementDataset
} from './attributes'
import Log from './log'
import Debug from './debug'
import reflexes from './reflexes'
import isolationMode from './isolation_mode'
import actionCable from './transports/action_cable'

// Default StimulusReflexController that is implicitly wired up as data-controller for any DOM elements
// that have configured data-reflex. Note that this default can be overridden when initializing the application.
// i.e. StimulusReflex.initialize(myStimulusApplication, MyCustomDefaultController);
//
class StimulusReflexController extends Controller {
  constructor (...args) {
    super(...args)
    register(this)
  }
}

// Initializes StimulusReflex by registering the default Stimulus controller with the passed Stimulus application.
//
// - application - the Stimulus application
// - options
//   * controller - [optional] the default StimulusReflexController
//   * consumer - [optional] the ActionCable consumer
//   * debug - [false] log all Reflexes to the console
//   * params - [{}] key/value parameters to send during channel subscription
//   * isolate - [false] restrict Reflex playback to the tab which initiated it
//
const initialize = (application, initializeOptions = {}) => {
  const { controller, consumer, debug, params, isolate } = initializeOptions
  actionCable.set(consumer, params)
  isolationMode.set(!!isolate)
  reflexes.app = application
  reflexes.app.schema = { ...defaultSchema, ...application.schema }
  reflexes.app.register(
    'stimulus-reflex',
    controller || StimulusReflexController
  )
  Debug.set(!!debug)
  const observer = new MutationObserver(setupDeclarativeReflexes)
  observer.observe(document.documentElement, {
    attributeFilter: [
      reflexes.app.schema.reflexAttribute,
      reflexes.app.schema.actionAttribute
    ],
    childList: true,
    subtree: true
  })
}

// Registers a Stimulus controller and extends it with StimulusReflex behavior
//
// controller - the Stimulus controller
// options - [optional] configuration
//
const register = (controller, options = {}) => {
  const channel = 'StimulusReflex::Channel'
  controller.StimulusReflex = { ...options, channel }
  actionCable.createSubscription(controller)
  Object.assign(controller, {
    // Indicates if the ActionCable web socket connection is open.
    // The connection must be open before calling stimulate.
    //
    isActionCableConnectionOpen () {
      return this.StimulusReflex.subscription.consumer.connection.isOpen()
    },

    // Invokes a server side reflex method.
    //
    // - target - the reflex target (full name of the server side reflex) i.e. 'ReflexClassName#method'
    // - controllerElement - [optional] the element that triggered the reflex, defaults to this.element
    // - options - [optional] an object that contains at least one of attrs, reflexId, selectors, resolveLate, serializeForm
    // - *args - remaining arguments are forwarded to the server side reflex method
    //
    stimulate () {
      const url = location.href
      const args = Array.from(arguments)
      const target = args.shift() || 'StimulusReflex::Reflex#default_reflex'
      const controllerElement = this.element
      const reflexElement =
        args[0] && args[0].nodeType === Node.ELEMENT_NODE
          ? args.shift()
          : controllerElement
      if (
        reflexElement.type === 'number' &&
        reflexElement.validity &&
        reflexElement.validity.badInput
      ) {
        if (Debug.enabled) console.warn('Reflex aborted: invalid numeric input')
        return
      }
      const options = {}
      if (
        args[0] &&
        typeof args[0] === 'object' &&
        Object.keys(args[0]).filter(key =>
          [
            'attrs',
            'selectors',
            'reflexId',
            'resolveLate',
            'serializeForm'
          ].includes(key)
        ).length
      ) {
        const opts = args.shift()
        Object.keys(opts).forEach(o => (options[o] = opts[o]))
      }
      const attrs = options['attrs'] || extractElementAttributes(reflexElement)
      const reflexId = options['reflexId'] || uuidv4()
      let selectors = options['selectors'] || getReflexRoots(reflexElement)
      if (typeof selectors === 'string') selectors = [selectors]
      const resolveLate = options['resolveLate'] || false
      const dataset = extractElementDataset(reflexElement)
      const xpathController = elementToXPath(controllerElement)
      const xpathElement = elementToXPath(reflexElement)
      const data = {
        target,
        args,
        url,
        attrs,
        dataset,
        selectors,
        reflexId,
        resolveLate,
        xpathController,
        xpathElement,
        reflexController: this.identifier,
        permanentAttributeName: reflexes.app.schema.reflexPermanentAttribute
      }
      const { subscription } = this.StimulusReflex

      if (!this.isActionCableConnectionOpen())
        throw 'The ActionCable connection is not open! `this.isActionCableConnectionOpen()` must return true before calling `this.stimulate()`'

      if (!actionCable.subscriptionActive)
        throw 'The ActionCable channel subscription for StimulusReflex was rejected.'

      // lifecycle setup
      controllerElement.reflexController =
        controllerElement.reflexController || {}
      controllerElement.reflexData = controllerElement.reflexData || {}
      controllerElement.reflexError = controllerElement.reflexError || {}

      controllerElement.reflexController[reflexId] = this
      controllerElement.reflexData[reflexId] = data

      dispatchLifecycleEvent(
        'before',
        reflexElement,
        controllerElement,
        reflexId
      )

      setTimeout(() => {
        const { params } = controllerElement.reflexData[reflexId] || {}
        const formData =
          options['serializeForm'] === false
            ? ''
            : serializeForm(reflexElement.closest('form'), {
                element: reflexElement
              })

        controllerElement.reflexData[reflexId] = {
          ...data,
          params,
          formData
        }

        subscription.send(controllerElement.reflexData[reflexId])
      })

      const promise = registerReflex(data)

      if (Debug.enabled) {
        Log.request(
          reflexId,
          target,
          args,
          this.context.scope.identifier,
          reflexElement,
          controllerElement
        )
      }

      return promise
    },

    // Wraps the call to stimulate for any data-reflex elements.
    // This is internal and should not be invoked directly.
    __perform (event) {
      let element = event.target
      let reflex

      while (element && !reflex) {
        reflex = element.getAttribute(reflexes.app.schema.reflexAttribute)
        if (!reflex || !reflex.trim().length) element = element.parentElement
      }

      const match = attributeValues(reflex).find(
        reflex => reflex.split('->')[0] === event.type
      )

      if (match) {
        event.preventDefault()
        event.stopPropagation()
        this.stimulate(match.split('->')[1], element)
      }
    }
  })
}

document.addEventListener('stimulus-reflex:server-message', serverMessage)
document.addEventListener('cable-ready:before-inner-html', beforeDOMUpdate)
document.addEventListener('cable-ready:before-morph', beforeDOMUpdate)
document.addEventListener('cable-ready:after-inner-html', afterDOMUpdate)
document.addEventListener('cable-ready:after-morph', afterDOMUpdate)
window.addEventListener('load', setupDeclarativeReflexes)

export default {
  initialize,
  register,
  get debug () {
    return Debug.value
  },
  set debug (value) {
    Debug.set(!!value)
  }
}
