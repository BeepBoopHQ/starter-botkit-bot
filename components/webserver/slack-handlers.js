var VerifyToken = require('./verify-token')

module.exports = (webserver, controller) => {
  var verifyToken = VerifyToken(process.env.SLACK_VERIFY_TOKEN)

  // Botkit endpoint for slack requests
  webserver.post('/slack/receive', verifyToken, (req, res) => {
    res.status(200)

    // Now, pass the webhook into be processed
    controller.handleWebhookPayload(req, res)
  })

  // Handle incoming Beep Boop synthetic Slack Events
  // `bb.team_added` - when a team adds your bot to their team
  // `bb.team_removed` - when a team removes your bot from their team
  webserver.post('/slack/event', verifyToken, (req, res) => {
    var event = (req.body && req.body.event) || {}
    var teamId = req.body && req.body.team_id
    console.log('bb slack event received: ', req.body)
    res.status(200)

    // handle team_removed by cleaning up data, but don't process through botkit - no team exists anymore
    if (event.type === 'bb.team_removed' && teamId) {
      controller.storage.teams.delete(req.body.team_id, err => {
        if (err) {
          console.log('Error cleaning up team data: %s', teamId)
        }
      })
      return
    }

    controller.handleWebhookPayload(req, res)
  })

  // Register default Beep Boop urls as well for convenience
  webserver.post('/slack/action', verifyToken, (req, res) => {
    res.status(200)

    // Now, pass the webhook into be processed
    controller.handleWebhookPayload(req, res)
  })

  webserver.post('/slack/command', verifyToken, (req, res) => {
    res.status(200)

    // Now, pass the webhook into be processed
    controller.handleWebhookPayload(req, res)
  })

  // Proxy `bb.team_added` to botkit's `create_team`
  controller.on('bb.team_added', function (bot) {
    controller.trigger('create_team', [bot, bot.team_info])
  })
}
