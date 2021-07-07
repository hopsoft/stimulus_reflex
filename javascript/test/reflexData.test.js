import assert from 'assert'
import { JSDOM } from 'jsdom'
import ReflexData from '../reflex_data'

describe('ReflexData', () => {
  it('returns an array of selectors', () => {
    assert.deepStrictEqual(new ReflexData({ selectors: '#an-id' }).selectors, [
      '#an-id'
    ])

    assert.deepStrictEqual(
      new ReflexData({ selectors: ['.item', 'li'] }).selectors,
      ['.item', 'li']
    )
  })

  it("attaches the element's innerHTML if includeInnerHTML is true", () => {
    const dom = new JSDOM(
      '<div><ul><li>First Item</li><li>Last Item</li></ul></div>'
    )
    const element = dom.window.document.querySelector('div')

    assert.equal(
      new ReflexData({ includeInnerHTML: true }, element, element).innerHTML,
      '<ul><li>First Item</li><li>Last Item</li></ul>'
    )
  })

  it("attaches the element's innerHTML if includeInnerHTML is declared on the reflexElement", () => {
    const dom = new JSDOM(
      '<div data-reflex-include-html><ul><li>First Item</li><li>Last Item</li></ul></div>'
    )
    const element = dom.window.document.querySelector('div')

    assert.equal(
      new ReflexData({}, element, element).innerHTML,
      '<ul><li>First Item</li><li>Last Item</li></ul>'
    )
  })

  it("doesn't attach the element's innerHTML if includeInnerHTML is falsey", () => {
    const dom = new JSDOM(
      '<div><ul><li>First Item</li><li>Last Item</li></ul></div>'
    )
    const element = dom.window.document.querySelector('div')

    assert.equal(new ReflexData({}, element, element).innerHTML, '')
  })

  it("attaches the element's textContent if includeTextContent is true", () => {
    const dom = new JSDOM('<div><p>Some Text <a>with a link</a></p></div>')
    const element = dom.window.document.querySelector('div')

    assert.equal(
      new ReflexData({ includeTextContent: true }, element, element)
        .textContent,
      'Some Text with a link'
    )
  })

  it("attaches the element's textContent if includeTextContent is declared on the reflex element", () => {
    const dom = new JSDOM(
      '<div data-reflex-include-text><p>Some Text <a>with a link</a></p></div>'
    )
    const element = dom.window.document.querySelector('div')

    assert.equal(
      new ReflexData({}, element, element).textContent,
      'Some Text with a link'
    )
  })

  it("doesn't attach the element's textContent if includeTextContent is falsey", () => {
    const dom = new JSDOM('<div><p>Some Text <a>with a link</a></p></div>')
    const element = dom.window.document.querySelector('div')

    assert.equal(new ReflexData({}, element, element).textContent, '')
  })

  it('preserves multiple values from a checkbox list', () => {
    const dom = new JSDOM(
      '<input type="checkbox" name="my-checkbox-collection" id="my-checkbox-collection-1" value="one" checked><input type="checkbox" name="my-checkbox-collection" id="my-checkbox-collection-2" value="two" checked><input type="checkbox" name="my-checkbox-collection" id="my-checkbox-collection-3 value="three">'
    )
    global.document = dom.window.document
    const element = dom.window.document.querySelector(
      '#my-checkbox-collection-1'
    )

    assert.equal(new ReflexData({}, element, element).attrs.value, 'one,two')
    assert.deepStrictEqual(new ReflexData({}, element, element).attrs.values, [
      'one',
      'two'
    ])
  })
})
