[![Lines of Code](http://img.shields.io/badge/lines_of_code-188-brightgreen.svg?style=flat)](http://blog.codinghorror.com/the-best-code-is-no-code-at-all/)
[![Maintainability](https://api.codeclimate.com/v1/badges/2b24fdbd1ae37a24bedb/maintainability)](https://codeclimate.com/github/hopsoft/stimulus_reflex/maintainability)

# StimulusReflex

### Build reactive [Single Page Applications (SPAs)](https://en.wikipedia.org/wiki/Single-page_application) with [Rails](https://rubyonrails.org) and [Stimulus](https://stimulusjs.org)

This project supports building [reactive applications](https://en.wikipedia.org/wiki/Reactive_programming)
with the Rails tooling you already know and love.
It's designed to work perfectly with [server rendered HTML](https://guides.rubyonrails.org/action_view_overview.html),
[Russian doll caching](https://edgeguides.rubyonrails.org/caching_with_rails.html#russian-doll-caching),
[Stimulus](https://stimulusjs.org), [Turbolinks](https://www.youtube.com/watch?v=SWEts0rlezA), etc...

__No need for a complex front-end framework. No need to grow your team or duplicate your efforts.__

_Inspired by [Phoenix LiveView](https://youtu.be/Z2DU0qLfPIY?t=670)._ 🙌

## Table of Contents

<!-- toc -->

- [Before you Begin](#before-you-begin)
- [How it Works](#how-it-works)
- [Setup](#setup)
  * [JavaScript](#javascript)
  * [Gemfile](#gemfile)
- [Basic Usage](#basic-usage)
  * [app/views/pages/example.html.erb](#appviewspagesexamplehtmlerb)
  * [app/javascript/controllers/example.js](#appjavascriptcontrollersexamplejs)
  * [app/reflexes/example_reflex.rb](#appreflexesexample_reflexrb)
- [Advanced Usage](#advanced-usage)
  * [ActionCable](#actioncable)
  * [Performance](#performance)
  * [ActionCable Rooms](#actioncable-rooms)
  * [Render Delay](#render-delay)
- [Demo Applications](#demo-applications)
- [Contributing](#contributing)

<!-- tocstop -->

## Before you Begin

StimulusReflex provides functionality similar to what can already be achieved with Rails by combining
[UJS remote elements](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#remote-elements)
, [Stimulus](https://stimulusjs.org), and [Turbolinks](https://github.com/turbolinks/turbolinks).
_Consider building with standard Rails tooling before introducing StimulusReflex._
_Check out the [Stimulus TodoMVC](https://github.com/hopsoft/stimulus_todomvc) example if you are unsure how to accomplish this._

StimulusReflex offers 3 primary benefits over the traditional Rails HTTP request/response cycle.

1. __Communication happens on the ActionCable web socket__ _- saves time by avoiding the overhead of establishishing traditional HTTP connections_
1. __The controller action is invoked directly__ _- skips framework overhead such as the middleware chain, etc..._
1. __DOM diffing is used to update the page__ _- provides faster rendering and less jitter_

## How it Works

1. Render a standard Rails view template
1. Use [Stimulus](https://stimulusjs.org) and [ActionCable](https://edgeguides.rubyonrails.org/action_cable_overview.html) to invoke a method on the server
1. Watch the page automatically render updates via fast [DOM diffing](https://github.com/patrick-steele-idem/morphdom)
1. That's it...

__Yes, it really is that simple.__
There are no hidden gotchas.

![How it Works](https://raw.githubusercontent.com/hopsoft/stimulus_reflex/master/docs/diagram.png)

## Setup

### JavaScript

```
yarn add stimulus_reflex
```

### Gemfile

```ruby
gem "stimulus_reflex"
```

## Basic Usage

### app/views/pages/example.html.erb

```erb
<head></head>
  <body>
    <a href="#" data-controller="example" data-action="click->example#increment">
      Increment <%= @count.to_i %>
    </a>
  </body>
</html>
```

### app/javascript/controllers/example.js

```javascript
import { Controller } from "stimulus"
import StimulusReflex from "stimulus_reflex"

export default class extends Controller {
  connect() {
    StimulusReflex.register(this);
  }

  increment() {
    // trigger a server-side reflex and a client-side page update
    this.stimulate('ExampleReflex#increment', 1);
  }
}
```

### app/reflexes/example_reflex.rb

```ruby
class ExampleReflex < StimulusReflex::Reflex
  def increment(step = 1)
    @count = @count.to_i + step
  end
end
```

The following happens after the `StimulusReflex::Reflex` method call finishes.

1. The page that triggered the reflex is re-rerendered. _Instance variables created in the reflex are available to both the controller and view templates._
2. The re-rendered HTML is sent to the client over the ActionCable socket.
3. The page is updated via fast DOM diffing courtesy of morphdom. _While future versions of StimulusReflex might support more granular updates, today the entire body is re-rendered and sent over the socket._

## Advanced Usage

### ActionCable

StimulusReflex will use the ActionCable defaults of `window.App` and `App.cable` if they exist.
If these defaults do not exist, StimulusReflex will establish a new socket connection.

### Performance

ActionCable emits verbose log messages. Disabling ActionCable logs may improve performance.

```ruby
# config/application.rb

ActionCable.server.config.logger = Logger.new(nil)
```

### ActionCable Rooms

You may find the need to restrict notifications to a specific room.
This can be accomplished by setting the `data-room` attribute on the StimulusController element.

```erb
<a href="#" data-controller="example" data-action="click->example#increment" data-room="12345">
```

### Render Delay

An attempt is made to reduce repaint/reflow jitter when users trigger lots of updates.

You can control how long to wait _(think debounce)_ prior to updating the page.
Simply set the `renderDelay` _(milliseconds)_ option when registering the controller.

```javascript
export default class extends Controller {
  connect() {
    StimulusReflex.register(this, {renderDelay: 200});
  }
}
```

The default value is `25`.

## Demo Applications

Building apps with StimulusReflex should evoke your memories of the original [Rails demo video](https://www.youtube.com/watch?v=Gzj723LkRJY).

> Look at all the things I'm **not** doing. -DHH

- [TodoMVC](https://github.com/hopsoft/stimulus_reflex_todomvc)

## Contributing

This project uses [Standard](https://github.com/testdouble/standard)
and [Prettier](https://github.com/prettier/prettier) to minimize bike shedding related to code formatting.
Please run `./bin/standardize` prior submitting pull requests.
