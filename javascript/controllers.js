import { attributeValues } from './attributes'
import { extractReflexName } from './utils'
import Schema from './schema'

// Returns StimulusReflex controllers local to the passed element based on the data-controller attribute.
//
const localReflexControllers = (app, element) => {
  return attributeValues(element.getAttribute(Schema.controller)).reduce(
    (memo, name) => {
      const controller = app.getControllerForElementAndIdentifier(element, name)
      if (controller && controller.StimulusReflex) memo.push(controller)
      return memo
    },
    []
  )
}

// Returns all StimulusReflex controllers for the passed element.
// Traverses DOM ancestors starting with element.
//
const allReflexControllers = (app, element) => {
  let controllers = []
  while (element) {
    controllers = controllers.concat(localReflexControllers(app, element))
    element = element.parentElement
  }
  return controllers
}

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

export { allReflexControllers, findControllerByReflexName }
