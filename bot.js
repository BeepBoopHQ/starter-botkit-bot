/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/

This is a sample Slack bot built with Botkit.

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var STUDIO_TOKEN = process.env.BOTKIT_STUDIO_TOKEN

var Botkit = require('botkit')
var fs = require('fs')
var path = require('path')
var debug = require('debug')('botkit:main')
var BotkitStorageBeepBoop = require('botkit-storage-beepboop')

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot({
  debug: false,
  studio_token: STUDIO_TOKEN,
  storage: BotkitStorageBeepBoop()
})

controller.startTicking()

// Set up an Express-powered webserver to expose oauth and webhook endpoints
require('./components/webserver/')(controller)

// Register sample "skills"
var normalizedPath = path.join(__dirname, 'skills')
fs.readdirSync(normalizedPath).forEach(file => {
  require(path.join(normalizedPath, file))(controller)
})

// This captures and evaluates any message sent to the bot as a DM
// or sent to the bot in the form "@bot message" and passes it to
// Botkit Studio to evaluate for trigger words and patterns.
// If a trigger is matched, the conversation will automatically fire!
// You can tie into the execution of the script using the functions
// controller.studio.before, controller.studio.after and controller.studio.validate
if (STUDIO_TOKEN) {
  controller.on('direct_message,direct_mention,mention', (bot, message) => {
    controller.studio.runTrigger(bot, message.text, message.user, message.channel).then(convo => {
      if (!convo) {
        // no trigger was matched
        // If you want your bot to respond to every message,
        // define a 'fallback' script in Botkit Studio
        // and uncomment the line below.
        // controller.studio.run(bot, 'fallback', message.user, message.channel)
      } else {
        // set variables here that are needed for EVERY script
        // use controller.studio.before('script') to set variables specific to a script
        convo.setVar('current_time', new Date())
      }
    }).catch(err => {
      bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err)
      debug('Botkit Studio: ', err)
    })
  })
} else {
  console.log('~~~~~~~~~~')
  console.log('NOTE: Botkit Studio functionality has not been enabled')
  console.log('To enable, pass in a studio_token parameter with a token from https://studio.botkit.ai/')
}
