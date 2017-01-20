var request = require('request')
var debug = require('debug')('botkit:register_with_studio')

module.exports = (webserver, controller) => {
  var registered = false

  // Don't register handler if botkit studio isn't configured
  if (controller.config.studio_token) {
    return
  }

  webserver.use((req, res, next) => {
    // Let request flow through immediately
    next()

    // Only run this once on the first request
    if (registered) {
      return
    }

    // information about this instance of Botkit
    // send to Botkit Studio in order to display in the hosting tab
    var form = {
      url: req.get('host'),
      version: controller.version(),
      ts: new Date()
    }

    request({
      method: 'post',
      uri: (controller.config.studio_command_uri || 'https://studio.botkit.ai') + '/api/v1/bots/phonehome?access_token=' + controller.config.studio_token,
      form
    }, (err, res, body) => {
      registered = true

      if (err) {
        return debug('Error registering instance with Botkit Studio', err)
      }

      var json = null
      try {
        json = JSON.parse(body)
      } catch (err) {
        debug('Error registering instance with Botkit Studio', err)
      }

      if (json && json.error) {
        debug('Error registering instance with Botkit Studio', json.error)
      }
    })
  })
}
