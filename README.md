# vue-actioncable

vue-actioncable automatically subscribes to channels when a component is mounted and thanks to vue's reactivity system, it resubscribes automatically when parameters change.

## Installation

For now, easiest way is to copy the `vue-actioncable.js` file into your `assets/javascripts` folder where it will be picked up by the build process.

## Usage

In your initialization code:

```coffee
var cable = ActionCable.createConsumer()
Vue.use(VueActionCable, cable)
```

And in your HTML/HAML file

```
new Vue
  data: ->
    messages: <%= raw @messages.to_json %>
  subscriptions:
    ChatChannel:
      params: ->
        room: this.room
      received: (message) ->
        this.messages.push(message)
```
