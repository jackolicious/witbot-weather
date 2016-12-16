var Botkit = require('botkit')
var Witbot = require('witbot')
var dateFormat = require('dateformat');

var slackToken = process.env.SLACK_TOKEN
var witToken = process.env.WIT_TOKEN
var openWeatherApiKey = process.env.OPENWEATHER_KEY
var qpxApiKey = process.env.QPXKEY
var amazonApiId = process.env.AMAZONAPIID
var amazonSecret = process.env.AMAZONSECRET
var amazonTag = process.env.AMAZONTAG

var controller = Botkit.slackbot({
  debug: false
})

controller.spawn({
  token: slackToken
}).startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Error connecting to slack: ', err)
  }
  console.log('Connected to slack')
})

var witbot = Witbot(witToken)
var wit;
var weather = require('./weather')(openWeatherApiKey)
var jokes = require('./jokes')()
var flights = require('./flights')(qpxApiKey)
var amazon = require('./amazon')(amazonApiId, amazonSecret, amazonTag)

controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {

  bot.reply(message, "boop");
  /*
  var wit = witbot.process(message.text, bot, message)

  wit.hears('hello',0.5, function(bot, message, outcome) {
    bot.reply(message, '> Greetings human! \n> :robot_face: :wave:')
  })

  wit.hears('purpose',0.5, function(bot, message, outcome) {
    bot.reply(message, '> 42')
  })

  wit.hears('how_are_you',0.5, function(bot, message, outcome) {
    bot.reply(message, "> I\'m a bot. I\'m doing as well as could be expected. \n> ¯\\_(ツ)_/¯")
  })

  wit.hears('help',0.5, function(bot, message, outcome) {
    bot.reply(message, "> :partly_sunny_rain: I can give you the weather\n> :money_with_wings: I can help you buy things\n> :airplane: I can search for one-way flights\n> :face_with_rolling_eyes: Oh, and I can tell pretty terrible jokes")
  })

  wit.hears('thanks',0.5, function(bot, message, outcome) {
    bot.reply(message, "> Where's the blushing bot emoji when you need it...")
  })

  wit.hears('love',0.5, function(bot, message, outcome) {
    bot.reply(message, "> Right, right now... up the butt :point_right::ok_hand:")
  })

  wit.hears('humanity',0.5, function(bot, message, outcome) {
    bot.reply(message, "> What does it really mean to be human?")
  })

  wit.hears('name',0.5, function(bot, message, outcome) {
    bot.reply(message, "> My name is Reverend Dr. Raymond Arther James III, Esquire")
  })

  wit.hears('joke',0.5, function(bot, message, outcome) {
    jokes.get(function(error, msg) {
      bot.reply(message, msg)
    })
  })

  wit.hears('button',0.5, function(bot, message, outcome) {
    var reply_with_attachments = {
        "text": "You have a new request to approve.",
        "attachments": [
          {
            "text": "I would like six pens for my creation station please.",
            "fallback": "Pen request",
            "title": "Request approval",
            "callback_id": "approval_2715",
            "color": "#8A2BE2",
            "attachment_type": "default",
            "actions": [
              {
                "name": "approve",
                "text": ":thumbsup: Approve",
                "style": "primary",
                "type": "button",
                "value": "yes",
                "confirm": {
                  "title": "Are you sure?",
                  "text": "This will approve the request.",
                  "ok_text": "Yes",
                  "dismiss_text": "No"
                }
              },
              {
                "name": "decline",
                "text": ":thumbsdown: Decline",
                "style": "danger",
                "type": "button",
                "value": "no"
              }
            ]
          }
        ]
      }
    bot.reply(message, reply_with_attachments);
    //bot.reply(message, 'buttonszzzzz')

  })

  wit.hears('amazon',0.5, function(bot, message, outcome) {
    if (Object.keys(outcome.entities).length === 0 && outcome.entities.constructor === Object) {
      console.log('object not found')
      bot.reply(message, "> :money_with_wings:Whachu tryna buy?")
      return
    }
    console.log('found: ' + outcome.entities.object[0].value)
    var item = outcome.entities.object[0].value;

    bot.reply(message, '> :mag:*' + item + '* coming right up...')
    amazon.get(item, function(error, msg) {
      bot.reply(message, msg)
    })

  })

  wit.hears('flight',0.5, function(bot, message, outcome) {
    if (!outcome.entities.origin || !outcome.entities.destination || !outcome.entities.datetime) {
      bot.reply(message,"> I can't read your mind! I need an origin, a destination and a date!");
      return
    }
    console.log('getting flight info: ' + outcome.entities.origin[0].value + ' - ' + outcome.entities.destination[0].value + ' - ' + outcome.entities.datetime[0].value)
    var origin = outcome.entities.origin[0].value.toUpperCase()
    var destination = outcome.entities.destination[0].value.toUpperCase()
    var dateObj = new Date(outcome.entities.datetime[0].value)
    date = dateFormat(dateObj, "isoDate");

    if (origin.length !== 3 || destination.length !== 3) {
      bot.reply(message,"> I only work with 3 letter airport codes for now");
      return
    }

    flights.get(origin, destination, date, function(error, msg) {
      bot.reply(message, msg)
    })
  })

  wit.hears('weather',0.5, function(bot, message, outcome) {
    console.log('asking for weather from: ' + outcome.entities.location)
    if(!outcome.entities.location || outcome.entities.location.length == 0) {
      bot.reply(message,"> I'm a bot, not a psychic. I need your location first...");
      return
    }
    var location = outcome.entities.location[0].value
    weather.get(location, function(error, msg) {
      if (error) {
        console.log(error)
        bot.reply(message, "> Beep boop pssskt  :boom:")
        return
      }
      bot.reply(message, msg)
    })
  })

  wit.otherwise(function (outcome) {
    bot.reply(message, "> Beep boop pssskt  :boom: I am a weather, one-way flight and joke bot \n> But I learn from every interaction... unlike most humans");
    bot.reply(message, "> Beep boop pssskt  :boom: I am a weather, one-way flight and joke bot \n> But I learn from every interaction... unlike most humans");
  })*/
})


/*
controller.hears('.*', 'direct_message,direct_mention', function(bot,message) {
  witbot.process(message.text, bot, message)
  //bot.reply(message,message.text)
  console.log('heard something: ', message.text)
})

//when witbot hears a hello above .5

*/
