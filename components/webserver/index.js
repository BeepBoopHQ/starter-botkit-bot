var express = require('express')
var bodyParser = require('body-parser')

module.exports = controller => {
  var webserver = express()
  webserver.use(bodyParser.json())
  webserver.use(bodyParser.urlencoded({ extended: true }))

  require('./register-botkit-studio')(webserver, controller)
  require('./slack-handlers')(webserver, controller)

  webserver.use(express.static('public'))

  webserver.listen(process.env.PORT || 3000, null, (err) => {
    if (err) {
      return console.error(err)
    }

    console.log('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000)
  })

  controller.webserver = webserver

  return webserver
}
