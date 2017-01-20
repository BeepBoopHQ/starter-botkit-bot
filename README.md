# Botkit Starter Kit for Slack Bots on Beep Boop

This repo is a fork of the [Botkit Starter Kit](https://github.com/howdyai/botkit-starter-slack) from [Howdy](https://howdy.ai/).  Some changes have been made to focus on running it on [Beep Boop][beepboop].

---

This repo contains everything you need to get started building a bot with Botkit and Botkit Studio!

[Botkit Studio](https://studio.botkit.ai/) is a set tools that adds capabilities
to the open source Botkit library by offering hosted GUI interfaces for script
management and action trigger definition. Botkit Studio is built by the company
that created and maintains the open source Botkit library, [Howdy.](https://howdy.ai)

### Beep Boop Setup

The easiest way to get started is to create a new project on [Beep Boop](https://beepboophq.com/0_o/my-projects/new) and select this sample repository as your starting point. There you'll be walked through setting up your Slack App and get your own copy of this repository.  Once you've set all of that up, you can clone your new repository and make changes locally, then push them to Beep Boop to trigger new builds of your bot.  We recommend adding your bot to a team and setting up that team as your development team using [Beep Boop's team override feature](https://beepboophq.com/docs/article/testing-slack-integrations-locally).

### Botkit Studio Setup

Get a Botkit Studio token [from your Botkit developer account](https://studio.botkit.ai/) and plug that into the settings page of your Beep Boop Project.

![image](https://cloud.githubusercontent.com/assets/367275/22307301/ab83766c-e2ff-11e6-8162-6b6bc900bd08.png)

### Local Development Setup

[Read about](https://beepboophq.com/docs/article/testing-slack-integrations-locally) how Beep Boop makes developing Slack Apps locally easier.

Install dependencies:

```bash
npm install
```

You'll need to set the following environment variables when running locally (they get set for you automatically when running on Beep Boop).  You can save these in a file called `env.sh` (which is `.gitignore`'d) and then source that.

```bash
export BOTKIT_STUDIO_TOKEN="API Token from Botkit Studio"
export BEEPBOOP_TOKEN="API Token from your Beep Boop Project Settings"
export SLACK_VERIFY_TOKEN="Verify Token from your Slack App"
```

To start your bot locally, just run:

```bash
npm start
```

...or to have it in watch mode to restart on changes:


```bash
npm run watch
```

Continue your journey to becoming a champion botmaster by [reading the Botkit Studio SDK documentation here.](https://github.com/howdyai/botkit/blob/master/readme-studio.md)

### Extend This Bot

This repo is designed to provide developers a robust starting point for building a custom bot. Included in the code are a set of sample bot "skills" that illustrate various aspects of the Botkit SDK features.  Once you are familiar with how Botkit works, you may safely delete all of the files in the `skills/` subfolder.

Developers will build custom features as modules that live in the `skills/` folder. The main bot application will automatically include any files placed there.

A skill module should be in the format:

```javascript
module.exports = function(controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

}
```

[beepboop]: https://beepboophq.com