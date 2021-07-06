import reflexes from './reflexes'

const request = (
  reflexId,
  target,
  args,
  controller,
  element,
  controllerElement
) => {
  reflexes[reflexId].timestamp = new Date()
  console.log(`\u2191 stimulus \u2191 ${target}`, {
    reflexId,
    args,
    controller,
    element,
    controllerElement
  })
}

const success = event => {
  const { detail } = event || {}
  const { selector, payload } = detail || {}
  const { reflexId, target, morph, serverMessage } = detail.stimulusReflex || {}
  const reflex = reflexes[reflexId]
  const progress =
    reflex.totalOperations > 1
      ? ` ${reflex.completedOperations}/${reflex.totalOperations}`
      : ''
  const duration = reflex.timestamp
    ? `in ${new Date() - reflex.timestamp}ms`
    : 'CLONED'
  const operation = event.type
    .split(':')[1]
    .split('-')
    .slice(1)
    .join('_')
  const halted = (serverMessage && serverMessage.subject === 'halted') || false
  console.log(
    `\u2193 reflex \u2193 ${target} \u2192 ${selector ||
      '\u221E'}${progress} ${duration}`,
    { reflexId, morph, operation, halted, payload }
  )
}

const error = event => {
  const { detail } = event || {}
  const { reflexId, target, serverMessage } = detail.stimulusReflex || {}
  const reflex = reflexes[reflexId]
  const duration = reflex.timestamp
    ? `in ${new Date() - reflex.timestamp}ms`
    : 'CLONED'
  const payload = detail.stimulusReflex
  console.log(
    `\u2193 reflex \u2193 ${target} ${duration} %cERROR: ${serverMessage.body}`,
    'color: #f00;',
    { reflexId, payload }
  )
}

export default { request, success, error }
