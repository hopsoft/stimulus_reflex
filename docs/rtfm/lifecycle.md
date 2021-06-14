---
description: How to hook into Reflex activity... aka callbacks
---

# Life-cycle

## Server-Side Reflex Callbacks

StimulusReflex gives you a set of callback events to control how your Reflex actions function. These usual suspects will be familiar to Rails developers:

* `before_reflex`, `around_reflex` , `after_reflex`
* All callbacks can receive multiple symbols representing Reflex actions, an optional block and the following options: `only`, `except`, `if`, `unless`
* You can abort a Reflex - prevent it from executing - by placing `throw :abort` in a `before_reflex` callback. An aborted Reflex will trigger the `halted` life-cycle stage on the client.

```ruby
class ExampleReflex < StimulusReflex::Reflex
  # will run only if the element has the step attribute, can use "unless" instead of "if" for opposite condition
  before_reflex :do_stuff, if: proc { |reflex| reflex.element.dataset[:step] }

  # will run only if the reflex instance has a url attribute, can use "unless" instead of "if" for opposite condition
  before_reflex :do_stuff, if: :url

  # will run before all reflexes
  before_reflex :do_stuff

  # will run before increment reflex, can use "except" instead of "only" for opposite condition
  before_reflex :do_stuff, only: [:increment]

  # will run around all reflexes, must have a yield in the callback
  around_reflex :do_stuff_around

 # will run after all reflexes
  after_reflex :do_stuff

  # Example with a block
  before_reflex do 
    # callback logic
  end

  # Example with multiple method names
  before_reflex :do_stuff, :do_stuff2

  # Example with halt
  before_reflex :run_checks

  def increment
    # reflex logic
  end

  def decrement
    # reflex logic
  end

  private

  def run_checks
    throw :abort # this will prevent the Reflex from continuing
  end

  def do_stuff
    # callback logic
  end

  def do_stuff2
    # callback logic
  end

  def do_stuff_around
    # before
    yield
    # after
  end
end
```

## Client-Side Reflex Callbacks

StimulusReflex gives you the ability to inject custom JavaScript at five distinct moments **around** sending an event to the server and updating the DOM. These hooks allow you to improve the user experience and handle edge cases.

1. **`before`** prior to sending a request over the web socket
2. **`success`** after the server side Reflex succeeds and the DOM has been updated
3. **`error`** whenever the server side Reflex raises an error
4. **`halted`** Reflex canceled by developer with `throw :abort` in the `before_reflex` callback
5. **`after`** follows either `success` or `error` immediately before DOM manipulations
6. **`finalize`** occurs immediately after all DOM manipulations are complete

{% hint style="info" %}
**Using life-cycle callback methods is not a requirement.**

Think of them as power tools that can help you build more sophisticated results. 👷
{% endhint %}

If you define a method with a name that matches what the library searches for, it will run at just the right moment. **If there's no method defined, nothing happens.** StimulusReflex will only look for these methods in Stimulus controllers that extend `ApplicationController` or have called `StimulusReflex.register(this)` in their `connect()` function.

There are two kinds of callback methods: **generic** and **custom**. Generic callback methods are invoked for every Reflex action on a controller. Custom callback methods are only invoked for specific Reflex actions.

StimulusReflex also emits life-cycle events which can be captured in other Stimulus controllers, [jQuery plugins](https://github.com/leastbad/jquery-events-to-dom-events) or even the console.

### Understanding Stages

Most of the time, it's reasonable to expect that your Reflexes will follow a predictable cycle: `before` -&gt; `success` -&gt; `after` -&gt; `finalize`.

There are, however, several important exceptions to the norm.

1. Reflexes that are aborted on the server have a short cycle: `before` -&gt; `halted`
2. Reflexes that have errors: `before` -&gt; `error` -&gt; `after` -&gt; \[`finalize`\]
3. **Nothing Morphs end early**: `before` -&gt; \[`success`\] -&gt; `after`

Nothing Morphs have no CableReady operations to wait for, so there is nothing to `finalize`. A Nothing Morph with an error will not have a `finalize` stage.

Nothing Morphs support `success` methods but do not emit `success` events.

### Generic Life-cycle Methods

StimulusReflex controllers automatically support five generic life-cycle callback methods. These methods fire for every Reflex action handled by the controller.

1. `beforeReflex`
2. `reflexSuccess`
3. `reflexError`
4. `reflexHalted`
5. `afterReflex`
6. `finalizeReflex`

{% hint style="warning" %}
While this is perfect for simpler Reflexes with a small number of actions, most developers quickly switch to using [Custom Life-cycle Methods](lifecycle.md#custom-life-cycle-methods), which allow you to define different callbacks for every action.
{% endhint %}

In this example, we update each anchor's text before invoking the server side Reflex:

{% code title="app/views/examples/show.html.erb" %}
```markup
<div data-controller="example">
  <a href="#" data-reflex="Example#masticate">Eat</a>
  <a href="#" data-reflex="Example#defecate">Poop</a>
</div>
```
{% endcode %}

{% code title="app/javascript/controllers/example\_controller.js" %}
```javascript
import ApplicationController from './application_controller.js'

export default class extends ApplicationController {
  beforeReflex(anchorElement) {
    const { reflex } = anchorElement.dataset
    if (reflex.match(/masticate$/)) anchorElement.innerText = 'Eating...'
    if (reflex.match(/defecate$/)) anchorElement.innerText = 'Pooping...'
  }
}
```
{% endcode %}

### Custom Life-cycle Methods

StimulusReflex controllers can define up to six custom life-cycle callback methods for **each** Reflex action. These methods use a naming convention **based on the name of the Reflex**. The naming follows the pattern `<actionName>Success` and matches the camelCased name of the action.

The Reflex `Example#poke` will cause StimulusReflex to check for the existence of the following life-cycle callback methods:

1. `beforePoke`
2. `pokeSuccess`
3. `pokeError`
4. `pokeHalted`
5. `afterPoke`
6. `finalizePoke`

{% code title="app/views/examples/show.html.erb" %}
```markup
<div data-controller="example">
  <a href="#" data-reflex="click->Example#poke">Poke</a>
  <a href="#" data-reflex="click->Example#purge">Purge</a>
</div>
```
{% endcode %}

{% code title="app/javascript/controllers/example\_controller.js" %}
```javascript
import ApplicationController from './application_controller.js'

export default class extends ApplicationController {
  beforePoke(element) {
    element.innerText = 'Poking...'
  }

  beforePurge(element) {
    element.innerText = 'Purging...'
  }
}
```
{% endcode %}

Adapting the Generic example, we've refactored our controller to capture the `before` callback events for each anchor individually.

{% hint style="info" %}
**It's not required to implement all life-cycle methods.** Pick and choose which life-cycle callback methods make sense for your application. The answer is frequently **none**.
{% endhint %}

### Conventions

#### Method Names

Life-cycle callback methods apply a naming convention based on your Reflex actions. For example, the Reflex `ExampleReflex#do_stuff` will produce the following camel-cased life-cycle callback methods.

1. `beforeDoStuff`
2. `doStuffSuccess`
3. `doStuffError`
4. `doStuffHalted`
5. `afterDoStuff`
6. `finalizeDoStuff`

#### Method Signatures

Both generic and custom life-cycle callback methods share the same arguments:

* `beforeReflex(element, reflex, noop, reflexId)`
* `reflexSuccess(element, reflex, noop, reflexId)`
* `reflexError(element, reflex, error, reflexId)`
* `reflexHalted(element, reflex, noop, reflexId)`
* `afterReflex(element, reflex, noop, reflexId)`
* `finalizeReflex(element, reflex, noop, reflexId)`

**element** - the DOM element that triggered the Reflex _this may not be the same as the controller's `this.element`_

**reflex** - the name of the server side Reflex

**error/noop** - the error message \(for reflexError\), otherwise `null`

**reflexId** - a UUID4 or developer-provided unique identifier for each Reflex

### Life-cycle Events

If you need to know when a Reflex method is called, but you're working outside of the Stimulus controller that initiated it, you can subscribe to receive DOM events.

DOM events are limited to the generic life-cycle; developers can obtain information about which Reflex methods were called by inspecting the detail object when the event is captured.

Events are dispatched on the same element that triggered the Reflex. Events bubble but cannot be cancelled.

#### Event Names

* `stimulus-reflex:before`
* `stimulus-reflex:success`
* `stimulus-reflex:error`
* `stimulus-reflex:halted`
* `stimulus-reflex:after`
* `stimulus-reflex:finalize`

Nothing Morphs do not emit `stimulus-reflex:success` events.

#### Event Metadata

When an event is captured, you can obtain all of the data required to respond to a Reflex action:

```javascript
document.addEventListener('stimulus-reflex:before', event => {
  event.target // the element that triggered the Reflex (may not be the same as controller.element)
  event.detail.reflex // the name of the invoked Reflex
  event.detail.reflexId // the UUID4 or developer-provided unique identifier for each Reflex
  event.detail.controller // the controller that invoked the stimuluate method
  event.target.reflexData[event.detail.reflexId] // the data payload that will be delivered to the server
  event.target.reflexData[event.detail.reflexId].params // the serialized form data for this Reflex
})
```

`event.target` is a reference to the element that triggered the Reflex, and `event.detail.controller` is a reference to the instance of the controller that called the `stimulate` method. This is especially handy if you have multiple instances of a controller on your page.

{% hint style="info" %}
Knowing which element dispatched the event might appear daunting, but the key is in knowing how the Reflex was created. If a Reflex is declared using a `data-reflex` attribute in your HTML, the event will be emitted by the element with the attribute.

You can learn all about Reflex controller elements on the [Calling Reflexes](reflexes.md#understanding-reflex-controllers) page.
{% endhint %}

#### jQuery Events

In addition to DOM events, StimulusReflex will also emits duplicate [jQuery events](https://api.jquery.com/category/events/event-handler-attachment/) which you can capture. This occurs only if the jQuery library is present in the global scope eg. available on `window`.

These jQuery events have the same name and `details` accessors as the DOM events.

### Promises

Are you a hardcore JavaScript developer? A props power-lifter? Then you'll be pleased to know that in addition to life-cycle methods and events, StimulusReflex allows you to write promise resolver functions:

```javascript
this.stimulate('Comments#create')
  .then(() => this.doSomething())
  .catch(() => this.handleError())
```

You can get a sense of the possibilities:

```javascript
this.stimulate('Post#publish')
  .then(payload => {
    const { data, element, event } = payload
    const { attrs, reflexId } = data
    // * attrs - an object that represents the attributes of the element that triggered the reflex
    // * data - the data sent from the client to the server over the web socket to invoke the reflex
    // * element - the element that triggered the reflex
    // * event - the source event
    // * reflexId - a unique identifier for this specific reflex invocation
  })
  .catch(payload => {
    const { data, element, event } = payload
    const { attrs, reflexId } = data
    const { error } = event.detail.stimulusReflex
    // * attrs - an object that represents the attributes of the element that triggered the reflex
    // * data - the data sent from the client to the server over the web socket to invoke the reflex
    // * element - the element that triggered the reflex
    // * error - the error message from the server
    // * event - the source event
    // * reflexId - a unique identifier for this specific reflex invocation
  })
```

You can get the `reflexId` of an unresolved promise:

```javascript
const snail = this.stimulate('Snail#secrete')
console.log(snail.reflexId)
snail.then(trail => {})
```

#### Configuring Promise resolution timing

Any Promise can only be resolved once, at which time your callback will run if defined. By default, StimulusReflex will resolve the Promise associated with a Reflex action during the `after` life-cycle stage. This means your callback will execute after the server has executed the Reflex action but before any DOM modifications are initiated. In some cases, this is too soon to be useful.

You can initiate a Reflex that will resolve its Promise during the `finalize` life-cycle stage, after all CableReady operations have completed. At this point, all DOM modifications are complete and it is safe to initiate animations or other effects.

To request that a Reflex resolve its Promise during the `finalize` stage instead of `after`, pass `resolveLate: true` as one of the possible optional arguments to the `stimulate` method.

```javascript
this.stimulate('Example#foo', { resolveLate: true }).then(() => {
  console.log('The Reflex has been finalized.')
}
```

## StimulusReflex Library Events

In addition to the Reflex life-cycle mechanisms, the StimulusReflex client library emits its own set of handy DOM events which you can hook into and use in your applications.

* `stimulus-reflex:connected`
* `stimulus-reflex:disconnected`
* `stimulus-reflex:rejected`
* `stimulus-reflex:ready`

All four events fire on `document`.

`connected` fires when the ActionCable connection is established, which is a precondition of a successful call to `stimulate` - meaning that you can delay calls until the event arrives. It will also fire after a `disconnected` subscription is reconnected.

`disconnected` fires if the connection to the server is lost; the `detail` object of the event has a `willAttemptReconnect` boolean which should be `true` in most cases.

`rejected` is fired if you're doing authentication in your Channel and the subscription request was denied.

`ready` is slightly different than the first three, in that it has nothing to do with the ActionCable subscription. Instead, it is called after StimulusReflex has scanned your page, looking for declared Reflexes to connect. This event fires every time the document body is modified, and was created primarily to support automated JS test runners like Cypress. Without this event, Cypress tests would have to wait for a few seconds before "clicking" on Reflex-enabled UI elements.

#### jQuery Events

In addition to DOM events, StimulusReflex will also emits duplicate [jQuery events](https://api.jquery.com/category/events/event-handler-attachment/) which you can capture. This occurs only if the jQuery library is present in the global scope eg. available on `window`.

These jQuery events have the same name and `details` accessors as the DOM events.

