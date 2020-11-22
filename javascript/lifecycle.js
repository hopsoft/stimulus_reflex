import { camelize } from './utils'

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
// - element - the element that triggered the reflex (not necessarily the Stimulus controller's element)
//
const invokeLifecycleMethod = (stage, element, reflexId) => {
  if (!element || !element.reflexData[reflexId]) return
  const controller = element.reflexController[reflexId]
  const reflex = element.reflexData[reflexId].target
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
      element,
      reflex,
      element.reflexError,
      reflexId
    )
  }

  if (typeof genericLifecycleMethod === 'function') {
    genericLifecycleMethod.call(
      controller,
      element,
      reflex,
      element.reflexError,
      reflexId
    )
  }

  if (reflexes[reflexId] && stage === reflexes[reflexId].finalStage) {
    delete element.reflexController[reflexId]
    delete element.reflexData[reflexId]
    delete element.reflexError
    delete reflexes[reflexId]
  }
}

document.addEventListener(
  'stimulus-reflex:before',
  event => invokeLifecycleMethod('before', event.target, event.detail.reflexId),
  true
)

document.addEventListener(
  'stimulus-reflex:success',
  event => {
    invokeLifecycleMethod('success', event.target, event.detail.reflexId)
    dispatchLifecycleEvent('after', event.target, event.detail.reflexId)
  },
  true
)

document.addEventListener(
  'stimulus-reflex:nothing',
  event => {
    invokeLifecycleMethod('success', event.target, event.detail.reflexId)
    dispatchLifecycleEvent('after', event.target, event.detail.reflexId)
  },
  true
)

document.addEventListener(
  'stimulus-reflex:error',
  event => {
    invokeLifecycleMethod('error', event.target, event.detail.reflexId)
    dispatchLifecycleEvent('after', event.target, event.detail.reflexId)
  },
  true
)

document.addEventListener(
  'stimulus-reflex:halted',
  event => invokeLifecycleMethod('halted', event.target, event.detail.reflexId),
  true
)

document.addEventListener(
  'stimulus-reflex:after',
  event => invokeLifecycleMethod('after', event.target, event.detail.reflexId),
  true
)

document.addEventListener(
  'stimulus-reflex:finalize',
  event =>
    invokeLifecycleMethod('finalize', event.target, event.detail.reflexId),
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
// - element - the element that triggered the reflex (not necessarily the Stimulus controller's element)
//
export const dispatchLifecycleEvent = (stage, element, reflexId) => {
  if (!element) return
  if (!element.reflexData) element.reflexData = {}
  const { target } = element.reflexData[reflexId] || {}
  element.dispatchEvent(
    new CustomEvent(`stimulus-reflex:${stage}`, {
      bubbles: true,
      cancelable: false,
      detail: {
        reflex: target,
        controller: element.reflexController[reflexId],
        reflexId
      }
    })
  )
}
