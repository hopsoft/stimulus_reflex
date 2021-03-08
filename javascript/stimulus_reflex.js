import { Controller } from 'stimulus'
import CableReady from 'cable_ready'
import { defaultSchema } from './schema'
import { getConsumer } from './consumer'
import { dispatchLifecycleEvent } from './lifecycle'
import { allReflexControllers } from './controllers'
import { uuidv4, debounce, emitEvent, serializeForm } from './utils'
import Log from './log'
import Debug from './debug'
import {
  attributeValue,
  attributeValues,
  extractElementAttributes,
  extractElementDataset
} from './attributes'
import { extractReflexName, elementToXPath, XPathToElement } from './utils'

// A lambda that does nothing. Very zen; we are made of stars
const NOOP = () => {}

// A reference to the Stimulus application registered with: StimulusReflex.initialize
let stimulusApplication

// A reference to the ActionCable consumer registered with: StimulusReflex.initialize or getConsumer
let actionCableConsumer

// A reference to an optional object called params defined in the StimulusReflex.initialize and passed to channels
let actionCableParams

// Flag which will be false if the server does not accept the channel subscription
let actionCableSubscriptionActive = false

// A dictionary of all active Reflex operations, indexed by reflexId
window.reflexes = {}

// Should Reflex playback be restricted to the tab that called it?
let isolationMode

// Subscribes a StimulusReflex controller to an ActionCable channel.
// controller - the StimulusReflex controller to subscribe
//
const createSubscription = controller => {
  actionCableConsumer = actionCableConsumer || getConsumer()
  const { channel } = controller.StimulusReflex
  const subscription = { channel, ...actionCableParams }
  const identifier = JSON.stringify(subscription)

  controller.StimulusReflex.subscription =
    actionCableConsumer.subscriptions.findAll(identifier)[0] ||
    actionCableConsumer.subscriptions.create(subscription, {
      received: data => {
        if (!data.cableReady) return

        let reflexOperations = {}

        for (let name in data.operations) {
          if (data.operations.hasOwnProperty(name)) {
            for (let i = data.operations[name].length - 1; i >= 0; i--) {
              if (
                data.operations[name][i].stimulusReflex ||
                (data.operations[name][i].detail &&
                  data.operations[name][i].detail.stimulusReflex)
              ) {
                reflexOperations[name] = reflexOperations[name] || []
                reflexOperations[name].push(data.operations[name][i])
                data.operations[name].splice(i, 1)
              }
            }
            if (!data.operations[name].length)
              Reflect.deleteProperty(data.operations, name)
          }
        }

        let totalOperations = 0
        let reflexData

        const dispatchEvent = reflexOperations['dispatchEvent']
        const morph = reflexOperations['morph']
        const innerHtml = reflexOperations['innerHtml']

        ;[dispatchEvent, morph, innerHtml].forEach(operation => {
          if (operation && operation.length) {
            const urls = Array.from(
              new Set(
                operation.map(m =>
                  m.detail ? m.detail.stimulusReflex.url : m.stimulusReflex.url
                )
              )
            )

            if (urls.length !== 1 || urls[0] !== location.href) return
            totalOperations += operation.length

            if (!reflexData) {
              reflexData = operation[0].detail
                ? operation[0].detail.stimulusReflex
                : operation[0].stimulusReflex
            }
          }
        })

        if (reflexData) {
          const { reflexId } = reflexData

          if (!reflexes[reflexId] && !isolationMode) {
            const controllerElement = XPathToElement(reflexData.xpathController)
            const reflexElement = XPathToElement(reflexData.xpathElement)
            controllerElement.reflexController =
              controllerElement.reflexController || {}
            controllerElement.reflexData = controllerElement.reflexData || {}
            controllerElement.reflexError = controllerElement.reflexError || {}

            controllerElement.reflexController[
              reflexId
            ] = stimulusApplication.getControllerForElementAndIdentifier(
              controllerElement,
              reflexData.reflexController
            )

            controllerElement.reflexData[reflexId] = reflexData
            dispatchLifecycleEvent(
              'before',
              reflexElement,
              controllerElement,
              reflexId
            )
            registerReflex(reflexData)
          }

          if (reflexes[reflexId]) {
            reflexes[reflexId].totalOperations = totalOperations
            reflexes[reflexId].pendingOperations = totalOperations
            reflexes[reflexId].completedOperations = 0
            CableReady.perform(reflexOperations)
          }
        }

        // run piggy back operations after stimulus reflex behavior
        CableReady.perform(data.operations)
      },
      connected: () => {
        actionCableSubscriptionActive = true
        emitEvent('stimulus-reflex:connected')
      },
      rejected: () => {
        actionCableSubscriptionActive = false
        emitEvent('stimulus-reflex:rejected')
        if (Debug.enabled) console.warn('Channel subscription was rejected.')
      },
      disconnected: willAttemptReconnect => {
        actionCableSubscriptionActive = false
        emitEvent('stimulus-reflex:disconnected', willAttemptReconnect)
      }
    })
}

// Extends a regular Stimulus controller with StimulusReflex behavior.
//
// Methods added to the Stimulus controller:
// - stimulate
// - __perform
//
const extendStimulusController = controller => {
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
      const datasetAttribute = stimulusApplication.schema.reflexDatasetAttribute
      const dataset = extractElementDataset(reflexElement, datasetAttribute)
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
        permanentAttributeName:
          stimulusApplication.schema.reflexPermanentAttribute
      }
      const { subscription } = this.StimulusReflex

      if (!this.isActionCableConnectionOpen())
        throw 'The ActionCable connection is not open! `this.isActionCableConnectionOpen()` must return true before calling `this.stimulate()`'

      if (!actionCableSubscriptionActive)
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
        reflex = element.getAttribute(
          stimulusApplication.schema.reflexAttribute
        )
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

const registerReflex = data => {
  const { reflexId } = data
  reflexes[reflexId] = { finalStage: 'finalize' }

  const promise = new Promise((resolve, reject) => {
    reflexes[reflexId].promise = {
      resolve,
      reject,
      data
    }
  })

  promise.reflexId = reflexId

  if (Debug.enabled) promise.catch(NOOP)

  return promise
}

// Registers a Stimulus controller and extends it with StimulusReflex behavior
//
// controller - the Stimulus controller
// options - [optional] configuration
//
const register = (controller, options = {}) => {
  const channel = 'StimulusReflex::Channel'
  controller.StimulusReflex = { ...options, channel }
  createSubscription(controller)
  extendStimulusController(controller)
}

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

// Sets up declarative reflex behavior.
// Any elements that define data-reflex will automatically be wired up with the default StimulusReflexController.
//
const setupDeclarativeReflexes = debounce(() => {
  document
    .querySelectorAll(`[${stimulusApplication.schema.reflexAttribute}]`)
    .forEach(element => {
      const controllers = attributeValues(
        element.getAttribute(stimulusApplication.schema.controllerAttribute)
      )
      const reflexAttributeNames = attributeValues(
        element.getAttribute(stimulusApplication.schema.reflexAttribute)
      )
      const actions = attributeValues(
        element.getAttribute(stimulusApplication.schema.actionAttribute)
      )
      reflexAttributeNames.forEach(reflexName => {
        const controller = findControllerByReflexName(
          reflexName,
          allReflexControllers(stimulusApplication, element)
        )
        let action
        if (controller) {
          action = `${reflexName.split('->')[0]}->${
            controller.identifier
          }#__perform`
          if (!actions.includes(action)) actions.push(action)
        } else {
          action = `${reflexName.split('->')[0]}->stimulus-reflex#__perform`
          if (!controllers.includes('stimulus-reflex')) {
            controllers.push('stimulus-reflex')
          }
          if (!actions.includes(action)) actions.push(action)
        }
      })
      const controllerValue = attributeValue(controllers)
      const actionValue = attributeValue(actions)
      if (
        controllerValue &&
        element.getAttribute(stimulusApplication.schema.controllerAttribute) !=
          controllerValue
      ) {
        element.setAttribute(
          stimulusApplication.schema.controllerAttribute,
          controllerValue
        )
      }
      if (
        actionValue &&
        element.getAttribute(stimulusApplication.schema.actionAttribute) !=
          actionValue
      )
        element.setAttribute(
          stimulusApplication.schema.actionAttribute,
          actionValue
        )
    })
  emitEvent('stimulus-reflex:ready')
}, 20)

// Given a reflex string such as 'click->TestReflex#create' and a list of
// controllers. It will find the matching controller based on the controller's
// identifier. e.g. Given these controller identifiers ['foo', 'bar', 'test'],
// it would select the 'test' controller.
const findControllerByReflexName = (reflexName, controllers) => {
  const controller = controllers.find(controller => {
    if (!controller.identifier) return

    return (
      extractReflexName(reflexName).toLowerCase() ===
      controller.identifier.toLowerCase()
    )
  })

  return controller || controllers[0]
}

// compute the DOM element(s) which will be the morph root
// use the data-reflex-root attribute on the reflex or the controller
// optional value is a CSS selector(s); comma-separated list
// order of preference is data-reflex, data-controller, document body (default)
const getReflexRoots = element => {
  let list = []
  while (list.length === 0 && element) {
    const reflexRoot = element.getAttribute(
      stimulusApplication.schema.reflexRootAttribute
    )
    if (reflexRoot) {
      if (reflexRoot.length === 0 && element.id) reflexRoot = `#${element.id}`
      const selectors = reflexRoot.split(',').filter(s => s.trim().length)
      if (selectors.length === 0) {
        console.error(
          `No value found for ${stimulusApplication.schema.reflexRootAttribute}. Add an #id to the element or provide a value for ${stimulusApplication.schema.reflexRootAttribute}.`,
          element
        )
      }
      list = list.concat(selectors.filter(s => document.querySelector(s)))
    }
    element = element.parentElement
      ? element.parentElement.closest(
          `[${stimulusApplication.schema.reflexRootAttribute}]`
        )
      : null
  }
  return list
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
  actionCableConsumer = consumer
  actionCableParams = params
  isolationMode = !!isolate
  stimulusApplication = application
  stimulusApplication.schema = { ...defaultSchema, ...application.schema }
  stimulusApplication.register(
    'stimulus-reflex',
    controller || StimulusReflexController
  )
  Debug.set(!!debug)
  const observer = new MutationObserver(setupDeclarativeReflexes)
  observer.observe(document.documentElement, {
    attributeFilter: [stimulusApplication.schema.reflexAttribute],
    childList: true,
    subtree: true
  })
}

const beforeDOMUpdate = event => {
  const { stimulusReflex } = event.detail || {}
  if (!stimulusReflex) return
  const { reflexId, xpathElement, xpathController } = stimulusReflex
  const controllerElement = XPathToElement(xpathController)
  const reflexElement = XPathToElement(xpathElement)
  const reflex = reflexes[reflexId]
  const promise = reflex.promise

  reflex.pendingOperations--

  if (reflex.pendingOperations > 0) return

  if (!stimulusReflex.resolveLate)
    setTimeout(() =>
      promise.resolve({ element: reflexElement, event, data: promise.data })
    )

  setTimeout(() =>
    dispatchLifecycleEvent(
      'success',
      reflexElement,
      controllerElement,
      reflexId
    )
  )
}

const afterDOMUpdate = event => {
  const { stimulusReflex } = event.detail || {}
  if (!stimulusReflex) return
  const { reflexId, xpathElement, xpathController } = stimulusReflex
  const controllerElement = XPathToElement(xpathController)
  const reflexElement = XPathToElement(xpathElement)
  const reflex = reflexes[reflexId]
  const promise = reflex.promise

  reflex.completedOperations++

  if (Debug.enabled) Log.success(event)

  if (reflex.completedOperations < reflex.totalOperations) return

  if (stimulusReflex.resolveLate)
    setTimeout(() =>
      promise.resolve({ element: reflexElement, event, data: promise.data })
    )

  setTimeout(() =>
    dispatchLifecycleEvent(
      'finalize',
      reflexElement,
      controllerElement,
      reflexId
    )
  )
}

const serverMessage = event => {
  const { reflexId, serverMessage, xpathController, xpathElement } =
    event.detail.stimulusReflex || {}
  const { subject, body } = serverMessage
  const controllerElement = XPathToElement(xpathController)
  const reflexElement = XPathToElement(xpathElement)
  const promise = reflexes[reflexId].promise
  const subjects = { error: true, halted: true, nothing: true, success: true }

  if (controllerElement) {
    controllerElement.reflexError = controllerElement.reflexError || {}
    if (subject === 'error') controllerElement.reflexError[reflexId] = body
  }

  promise[subject === 'error' ? 'reject' : 'resolve']({
    data: promise.data,
    element: reflexElement,
    event,
    toString: () => body
  })

  reflexes[reflexId].finalStage = subject === 'halted' ? 'halted' : 'after'

  if (Debug.enabled) Log[subject === 'error' ? 'error' : 'success'](event)

  if (subjects[subject])
    dispatchLifecycleEvent(subject, reflexElement, controllerElement, reflexId)
}

const updateCookies = () => {
  fetch('/stimulus_reflex/update-cookies', {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
}

document.addEventListener('stimulus-reflex:server-message', serverMessage)
document.addEventListener('stimulus-reflex:update-cookies', updateCookies)
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
