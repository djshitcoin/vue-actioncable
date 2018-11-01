var VueActionCable = {
  install: function(Vue, cable) {
    Vue.mixin({
      destroyed: function() {
        if (!this._subscriptions) return
        Object.keys(this._subscriptions).map(function(key) {
          this._subscriptions[key].unsubscribe()
        })
      },
      mounted: function() {
        var $vm = this
        var subscriptionsOptions = this.$options.subscriptions
        if (!subscriptionsOptions) return
        this._subscriptions = {}
        if (typeof subscriptionsOptions == 'function') subscriptionsOptions = subscriptionsOptions()
        Object.keys(subscriptionsOptions).map(function(channelName) {
          var subOptions = subscriptionsOptions[channelName]
          if (!subOptions.params) subOptions.params = {}
          var paramsFn = subOptions.params
          if (typeof paramsFn !== 'function') {
            paramsFn = function() { return subOptions.params }
          }
          $vm.$watch(paramsFn, function(params) {
            if ($vm._subscriptions[channelName]) $vm._subscriptions[channelName].unsubscribe()
            params.channel = channelName
            $vm._subscriptions[channelName] = cable.subscriptions.create(params, {
              received: subOptions.received.bind($vm)
            })
          }, {
            immediate: true
          })
        })
      }
    })
  }
}
