// uuid4 function taken from stackoverflow
// https://stackoverflow.com/a/2117523/554903

export const uuidv4 = () => {
  const crypto = window.crypto || window.msCrypto
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

export const serializeForm = (form, options = {}) => {
  if (!form) return ''

  const w = options.w || window
  const { element } = options
  const formData = new w.FormData(form)
  const data = Array.from(formData, e => e.map(encodeURIComponent).join('='))
  const submitButton = form.querySelector('input[type=submit]')
  if (
    element &&
    element.name &&
    element.nodeName === 'INPUT' &&
    element.type === 'submit'
  ) {
    data.push(
      `${encodeURIComponent(element.name)}=${encodeURIComponent(element.value)}`
    )
  } else if (submitButton && submitButton.name) {
    data.push(
      `${encodeURIComponent(submitButton.name)}=${encodeURIComponent(
        submitButton.value
      )}`
    )
  }

  return Array.from(new Set(data)).join('&')
}

export const camelize = (value, uppercaseFirstLetter = true) => {
  if (typeof value !== 'string') return ''
  value = value
    .replace(/[\s_](.)/g, $1 => $1.toUpperCase())
    .replace(/[\s_]/g, '')
    .replace(/^(.)/, $1 => $1.toLowerCase())

  if (uppercaseFirstLetter)
    value = value.substr(0, 1).toUpperCase() + value.substr(1)

  return value
}

export const debounce = (callback, delay = 250) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = null
      callback(...args)
    }, delay)
  }
}

export const extractReflexName = reflexString => {
  const match = reflexString.match(/(?:.*->)?(.*?)(?:Reflex)?#/)

  return match ? match[1] : ''
}

export const emitEvent = (event, detail) => {
  document.dispatchEvent(
    new CustomEvent(event, {
      bubbles: true,
      cancelable: false,
      detail
    })
  )
  if (window.jQuery) window.jQuery(document).trigger(event, detail)
}

// construct a valid xPath for an element in the DOM
export const elementToXPath = element => {
  if (element.id !== '') return "//*[@id='" + element.id + "']"
  if (element === document.body) return '/html/body'

  let ix = 0
  const siblings = element.parentNode.childNodes

  for (var i = 0; i < siblings.length; i++) {
    const sibling = siblings[i]
    if (sibling === element) {
      const computedPath = elementToXPath(element.parentNode)
      const tagName = element.tagName.toLowerCase()
      const ixInc = ix + 1
      return `${computedPath}/${tagName}[${ixInc}]`
    }

    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++
    }
  }
}

export const XPathToElement = xpath => {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue
}

export const XPathToArray = (xpath, reverse = false) => {
  const snapshotList = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  )

  const snapshots = []

  for (let i = 0; i < snapshotList.snapshotLength; i++) {
    snapshots.push(snapshotList.snapshotItem(i))
  }

  return reverse ? snapshots.reverse() : snapshots
}
