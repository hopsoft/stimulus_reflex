import { extractElementAttributes, extractElementDataset } from './attributes'
import { getReflexRoots } from './reflexes'
import { uuidv4 } from './utils'
import { elementToXPath } from './utils'

export default class ReflexData {
  constructor (
    options,
    reflexElement,
    controllerElement,
    reflexController,
    permanentAttributeName,
    target,
    args,
    url,
    tabId
  ) {
    this.options = options
    this.reflexElement = reflexElement
    this.controllerElement = controllerElement
    this.reflexController = reflexController
    this.permanentAttributeName = permanentAttributeName
    this.target = target
    this.args = args
    this.url = url
    this.tabId = tabId
  }

  get attrs () {
    return this.options['attrs'] || extractElementAttributes(this.reflexElement)
  }

  get reflexId () {
    this._reflexId = this._reflexId || this.options['reflexId'] || uuidv4()
    return this._reflexId
  }

  get selectors () {
    const selectors =
      this.options['selectors'] || getReflexRoots(this.reflexElement)
    if (typeof selectors === 'string') {
      return [selectors]
    } else {
      return selectors
    }
  }

  get resolveLate () {
    return this.options['resolveLate'] || false
  }

  get dataset () {
    return extractElementDataset(this.reflexElement)
  }

  get innerHTML () {
    return this.includeHTML ? this.reflexElement.innerHTML : ''
  }

  get textContent () {
    return this.includeText ? this.reflexElement.textContent : ''
  }

  get xpathController () {
    return elementToXPath(this.controllerElement)
  }

  get xpathElement () {
    return elementToXPath(this.reflexElement)
  }

  get includeHTML () {
    return (
      this.options['includeInnerHTML'] ||
      'reflexIncludeHtml' in this.reflexElement.dataset
    )
  }

  get includeText () {
    return (
      this.options['includeTextContent'] ||
      'reflexIncludeText' in this.reflexElement.dataset
    )
  }

  get formSelector () {
    return (
      this.options['formSelector'] ||
      this.reflexElement.dataset.reflexFormSelector
    )
  }

  valueOf () {
    return {
      attrs: this.attrs,
      dataset: this.dataset,
      selectors: this.selectors,
      reflexId: this.reflexId,
      resolveLate: this.resolveLate,
      xpathController: this.xpathController,
      xpathElement: this.xpathElement,
      inner_html: this.innerHTML,
      text_content: this.textContent,
      formSelector: this.formSelector,
      reflexController: this.reflexController,
      permanentAttributeName: this.permanentAttributeName,
      target: this.target,
      args: this.args,
      url: this.url,
      tabId: this.tabId
    }
  }
}
