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
    this._attrs =
      this._attrs ||
      this.options['attrs'] ||
      extractElementAttributes(this.reflexElement)

    return this._attrs
  }

  get reflexId () {
    this._reflexId = this._reflexId || this.options['reflexId'] || uuidv4()
    return this._reflexId
  }

  get selectors () {
    this._selectors =
      this._selectors ||
      this.options['selectors'] ||
      getReflexRoots(this.reflexElement)
    if (typeof this._selectors === 'string') {
      return [this._selectors]
    } else {
      return this._selectors
    }
  }

  get resolveLate () {
    return this.options['resolveLate'] || false
  }

  get dataset () {
    this._dataset = this._dataset || extractElementDataset(this.reflexElement)
    return this._dataset
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
      reflexController: this.reflexController,
      permanentAttributeName: this.permanentAttributeName,
      target: this.target,
      args: this.args,
      url: this.url,
      tabId: this.tabId
    }
  }
}
