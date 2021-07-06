import { camelize } from './utils'
import Debug from './debug'
import reflexes from './reflexes'

// Invokes a lifecycle method on a StimulusReflex controller.
//
// - stage - the lifecycle stage
//   * before
//   * success
//   * error
//   * halted
//   * after
//   * finalize
//
// - reflexElement - the element that triggered the Reflex (not necessarily the StimulusReflex Controller Element)
// - controllerElement - the element holding the StimulusReflex Controller
// - reflexId - the UUIDv4 which uniquely identifies the Reflex
// - payload - the optional "return value" from the Reflex method
//
const invokeLifecycleMethod = (
  stage,
  reflexElement,
  controllerElement,
  reflexId,
  payload
) => {
  if (!controllerElement || !controllerElement.reflexData[reflexId]) return

  const controller = controllerElement.reflexController[reflexId]
  const reflex = controllerElement.reflexData[reflexId].target
  const reflexMethodName = reflex.split('#')[1]

  const specificLifecycleMethodName = ['before', 'after', 'finalize'].includes(
    stage
  )
    ? `${stage}${camelize(reflexMethodName)}`
    : `${camelize(reflexMethodName, false)}${camelize(stage)}`
  const specificLifecycleMethod = controller[specificLifecycleMethodName]

  const genericLifecycleMethodName = ['before', 'after', 'finalize'].includes(
    stage
  )
    ? `${stage}Reflex`
    : `reflex${camelize(stage)}`
  const genericLifecycleMethod = controller[genericLifecycleMethodName]

  if (typeof specificLifecycleMethod === 'function') {
    specificLifecycleMethod.call(
      controller,
      reflexElement,
      reflex,
      controllerElement.reflexError[reflexId],
      reflexId,
      payload
    )
  }

  if (typeof genericLifecycleMethod === 'function') {
    genericLifecycleMethod.call(
      controller,
      reflexElement,
      reflex,
      controllerElement.reflexError[reflexId],
      reflexId,
      payload
    )
  }

  if (reflexes[reflexId] && stage === reflexes[reflexId].finalStage) {
    Reflect.deleteProperty(controllerElement.reflexController, reflexId)
    Reflect.deleteProperty(controllerElement.reflexData, reflexId)
    Reflect.deleteProperty(controllerElement.reflexError, reflexId)
    // Removing this on a trial basis
    // 1. Prevents race condition with CR broadcasts
    // 2. Planning to remove it for v4 as part of queueing refactor
    // 3. Removing reflexes shouldn't be the responsibility of the lifecycle subsystem
    // Reflect.deleteProperty(reflexes, reflexId)
  }
}

document.addEventListener(
  'stimulus-reflex:before',
  event =>
    invokeLifecycleMethod(
      'before',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    ),
  true
)

document.addEventListener(
  'stimulus-reflex:success',
  event => {
    invokeLifecycleMethod(
      'success',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    )
    dispatchLifecycleEvent(
      'after',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    )
  },
  true
)

document.addEventListener(
  'stimulus-reflex:nothing',
  event => {
    invokeLifecycleMethod(
      'success',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    )
    dispatchLifecycleEvent(
      'after',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    )
  },
  true
)

document.addEventListener(
  'stimulus-reflex:error',
  event => {
    invokeLifecycleMethod(
      'error',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    )
    dispatchLifecycleEvent(
      'after',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    )
  },
  true
)

document.addEventListener(
  'stimulus-reflex:halted',
  event =>
    invokeLifecycleMethod(
      'halted',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    ),
  true
)

document.addEventListener(
  'stimulus-reflex:after',
  event =>
    invokeLifecycleMethod(
      'after',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    ),
  true
)

document.addEventListener(
  'stimulus-reflex:finalize',
  event =>
    invokeLifecycleMethod(
      'finalize',
      event.detail.element,
      event.detail.controller.element,
      event.detail.reflexId,
      event.detail.payload
    ),
  true
)

// Dispatches a lifecycle event on document
//
// - stage - the lifecycle stage
//   * before
//   * success
//   * error
//   * halted
//   * after
//   * finalize
//
// - reflexElement - the element that triggered the Reflex (not necessarily the StimulusReflex Controller Element)
//
// - controllerElement - the element holding the StimulusReflex Controller
//
// - reflexId - the UUIDv4 which uniquely identifies the Reflex
//
const dispatchLifecycleEvent = (
  stage,
  reflexElement,
  controllerElement,
  reflexId,
  payload
) => {
  if (!controllerElement) {
    if (Debug.enabled && !reflexes[reflexId].warned) {
      console.warn(
        `StimulusReflex was not able execute callbacks or emit events for "${stage}" or later life-cycle stages for this Reflex. The StimulusReflex Controller Element is no longer present in the DOM. Could you move the StimulusReflex Controller to an element higher in your DOM?`
      )
      reflexes[reflexId].warned = true
    }
    return
  }

  if (
    !controllerElement.reflexController ||
    (controllerElement.reflexController &&
      !controllerElement.reflexController[reflexId])
  ) {
    if (Debug.enabled && !reflexes[reflexId].warned) {
      console.warn(
        `StimulusReflex detected that the StimulusReflex Controller responsible for this Reflex has been replaced with a new instance. Callbacks and events for "${stage}" or later life-cycle stages cannot be executed.`
      )
      reflexes[reflexId].warned = true
    }
    return
  }

  const { target } = controllerElement.reflexData[reflexId] || {}
  const controller = controllerElement.reflexController[reflexId] || {}
  const event = `stimulus-reflex:${stage}`
  const detail = {
    reflex: target,
    controller,
    reflexId,
    element: reflexElement,
    payload
  }

  controllerElement.dispatchEvent(
    new CustomEvent(event, { bubbles: true, cancelable: false, detail })
  )
  if (window.jQuery) window.jQuery(controllerElement).trigger(event, detail)
}

export { dispatchLifecycleEvent }
