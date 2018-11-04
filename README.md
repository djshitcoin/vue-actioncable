# vue-actioncable

vue-actioncable automatically subscribes to channels when a component is mounted and thanks to vue's reactivity system, it resubscribes automatically when parameters change.

## Installation

For now, easiest way is to copy the `vue-actioncable.js` file into your `assets/javascripts` folder where it will be picked up by the build process.

## Usage

In your initialization code:

```js
var cable = ActionCable.createConsumer()
Vue.use(VueActionCable, cable)
```

And in your HTML/HAML file

```coffee
new Vue
  data: ->
    messages: <%= raw @messages.to_json %>
    room: 'somechannel'
  subscriptions:
    ChatChannel:
      # you can pass vue instance data here
      params: ->
        room: this.room
      # actioncable callbacks go here
      received: (message) ->
        this.messages.push(message)
      connected: ->
        console.log('suh dude')
      disconnected: ->
        console.log('gg')
```
