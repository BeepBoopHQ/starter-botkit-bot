var debug = require('debug')('botkit:onboarding')

module.exports = controller => {
  controller.on('create_team', bot => {
    debug('Starting an onboarding experience!')

    if (controller.config.studio_token) {
      bot.api.im.open({user: bot.config.createdBy}, (err, directMessage) => {
        if (err) {
          return debug('Error sending onboarding message:', err)
        }

        controller.studio.run(bot, 'onboarding', bot.config.createdBy, directMessage.channel.id).catch(err => {
          debug('Error: encountered an error loading onboarding script from Botkit Studio:', err)
        })
      })
    } else {
      bot.startPrivateConversation({user: bot.config.createdBy}, (err, convo) => {
        if (err) {
          return console.log(err)
        }

        convo.say('I am a bot that has just joined your team')
        convo.say('You must now /invite me to a channel so that I can be of use!')
      })
    }
  })
}
