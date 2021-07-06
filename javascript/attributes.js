import { elementToXPath, XPathToArray } from './utils'
import Schema from './schema'
import Debug from './debug'
import Deprecate from './deprecate'

const multipleInstances = element => {
  if (['checkbox', 'radio'].includes(element.type)) {
    return (
      document.querySelectorAll(
        `input[type="${element.type}"][name="${element.name}"]`
      ).length > 1
    )
  }
  return false
}
const collectCheckedOptions = element => {
  return Array.from(element.querySelectorAll('option:checked'))
    .concat(
      Array.from(
        document.querySelectorAll(
          `input[type="${element.type}"][name="${element.name}"]`
        )
      ).filter(elem => elem.checked)
    )
    .map(o => o.value)
}

// Returns a string value for the passed array.
//
//   attributeValue(['', 'one', null, 'two', 'three ']) // 'one two three'
//
const attributeValue = (values = []) => {
  const value = values
    .filter(v => v && String(v).length)
    .map(v => v.trim())
    .join(' ')
    .trim()
  return value.length ? value : null
}

// Returns an array for the passed string value by splitting on whitespace.
//
//   attributeValues('one two three ') // ['one', 'two', 'three']
//
const attributeValues = value => {
  if (!value) return []
  if (!value.length) return []
  return value.split(' ').filter(v => v.trim().length)
}

// Extracts attributes from a DOM element.
//
const extractElementAttributes = element => {
  let attrs = Array.from(element.attributes).reduce((memo, attr) => {
    memo[attr.name] = attr.value
    return memo
  }, {})

  attrs.checked = !!element.checked
  attrs.selected = !!element.selected
  attrs.tag_name = element.tagName

  if (element.tagName.match(/select/i) || multipleInstances(element)) {
    const collectedOptions = collectCheckedOptions(element)
    attrs.values = collectedOptions
    attrs.value = collectedOptions.join(',')
  } else {
    attrs.value = element.value
  }
  return attrs
}

// Returns an array of elements for the provided tokens.
// Tokens is an array of space separated string coming from the `data-reflex-dataset`
// or `data-reflex-dataset-all` attribute.
//
const getElementsFromTokens = (element, tokens) => {
  if (!tokens || tokens.length === 0) return []

  let elements = [element]

  const xPath = elementToXPath(element)

  tokens.forEach(token => {
    try {
      switch (token) {
        case 'combined':
          if (Deprecate.enabled)
            console.warn(
              "In the next version of StimulusReflex, the 'combined' option to data-reflex-dataset will become 'ancestors'."
            )
          elements = [
            ...elements,
            ...XPathToArray(`${xPath}/ancestor::*`, true)
          ]
          break
        case 'ancestors':
          elements = [
            ...elements,
            ...XPathToArray(`${xPath}/ancestor::*`, true)
          ]
          break
        case 'parent':
          elements = [...elements, ...XPathToArray(`${xPath}/parent::*`)]
          break
        case 'siblings':
          elements = [
            ...elements,
            ...XPathToArray(
              `${xPath}/preceding-sibling::*|${xPath}/following-sibling::*`
            )
          ]
          break
        case 'children':
          elements = [...elements, ...XPathToArray(`${xPath}/child::*`)]
          break
        case 'descendants':
          elements = [...elements, ...XPathToArray(`${xPath}/descendant::*`)]
          break
        default:
          elements = [...elements, ...document.querySelectorAll(token)]
      }
    } catch (error) {
      if (Debug.enabled) console.error(error)
    }
  })

  return elements
}

// Extracts the dataset of an element and combines it with the data attributes from all specified tokens
//
const extractElementDataset = element => {
  const dataset = element.attributes[Schema.reflexDataset]
  const allDataset = element.attributes[Schema.reflexDatasetAll]

  const tokens = (dataset && dataset.value.split(' ')) || []
  const allTokens = (allDataset && allDataset.value.split(' ')) || []

  const datasetElements = getElementsFromTokens(element, tokens)
  const datasetAllElements = getElementsFromTokens(element, allTokens)

  const datasetAttributes = datasetElements.reduce((acc, ele) => {
    return { ...extractDataAttributes(ele), ...acc }
  }, {})

  const reflexElementAttributes = extractDataAttributes(element)

  const elementDataset = {
    dataset: { ...reflexElementAttributes, ...datasetAttributes },
    datasetAll: {}
  }

  datasetAllElements.forEach(element => {
    const elementAttributes = extractDataAttributes(element)

    Object.keys(elementAttributes).forEach(key => {
      const value = elementAttributes[key]

      if (
        elementDataset.datasetAll[key] &&
        Array.isArray(elementDataset.datasetAll[key])
      ) {
        elementDataset.datasetAll[key].push(value)
      } else {
        elementDataset.datasetAll[key] = [value]
      }
    })
  })

  return elementDataset
}

// Extracts all data attributes from a DOM element.
//
const extractDataAttributes = element => {
  let attrs = {}

  if (element && element.attributes) {
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        attrs[attr.name] = attr.value
      }
    })
  }

  return attrs
}

export {
  attributeValue,
  attributeValues,
  extractElementAttributes,
  extractElementDataset,
  extractDataAttributes
}
