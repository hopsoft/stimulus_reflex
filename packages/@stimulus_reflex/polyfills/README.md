# Polyfills for StimulusReflex

### Description

The `@stimulus_reflex/polyfills` package provides support for StimulusReflex and CableReady in older browsers like Internet Explorer 11.

### Usage

To include the polyfills you just have to import the package. Typically you want to import it in `app/javascript/packs/application.js`.

```javascript
// app/javascript/packs/application.js

import '@stimulus_reflex/polyfills'
import 'controllers'

// ...
```

If you have an existing import for `@stimulus/polyfills` you can safely remove it. The `@stimulus/polyfills` package is included with `@stimulus_reflex/polyfills`.


```diff
-import '@stimulus/polyfills'
+import '@stimulus_reflex/polyfills'
```


### Details

This repository contains a few polyfills itself and bundles up polyfills from other packages. The following list shows the included polyfills and where they are coming from:

#### Polyfills included/imported in this package

* Custom
  * [`NodeList.forEach()`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill)

* [core-js](https://www.npmjs.com/package/core-js)
  * `String.startsWith()`
  * `String.includes()`

#### Polyfills imported from `@stimulus/polyfills`

* [core-js](https://www.npmjs.com/package/core-js)
  * `Array.find()`
  * `Array.findIndex()`
  * `Array.from()`
  * `Map`
  * `Object.assign()`
  * `Promise`
  * `Reflect.deleteProperty()`
  * `Set`
* [element-closest](https://www.npmjs.com/package/element-closest)
  * `Element.closest()`
* [mutation-observer-inner-html-shim](https://www.npmjs.com/package/mutation-observer-inner-html-shim)
  * `MutationObserver` support for Internet Explorer 11
* [eventlistener-polyfill](https://github.com/github/eventlistener-polyfill)
  * once & passive support for Internet Explorer 11 & Edge

#### Polyfills imported from `@cable_ready/polyfills`

* [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill)

* [core-js](https://www.npmjs.com/package/core-js)
  * `Array.flat()`
  * `Array.forEach()`
  * `Array.from()`
  * `Array.includes()`
  * `Object.entries()`
  * `Promise`

* [`<template>`](https://www.npmjs.com/package/@webcomponents/template)

#### Polyfills imported from `formdata-polyfill`
* [`FormData`](https://www.npmjs.com/package/formdata-polyfill)
