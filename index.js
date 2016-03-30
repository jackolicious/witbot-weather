var Botkit = require('botkit')
var Witbot = require('witbot')
var dateFormat = require('dateformat');

var slackToken = process.env.SLACK_TOKEN
var witToken = process.env.WIT_TOKEN
var openWeatherApiKey = process.env.OPENWEATHER_KEY
var qpxApiKey = process.env.QPXKEY

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

controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
  var wit = witbot.process(message.text, bot, message)

  wit.hears('hello',0.5, function(bot, message, outcome) {
    bot.reply(message, '> Greetings human! \n> :robot_face: :wave:')
  })

  wit.hears('how_are_you',0.5, function(bot, message, outcome) {
    bot.reply(message, "> I\'m a bot. I\'m doing as well as could be expected. \n> ¯\\_(ツ)_/¯")
  })

  wit.hears('help',0.5, function(bot, message, outcome) {
    bot.reply(message, "> :partly_sunny_rain: I can give you the weather\n> :airplane: I can search for one-way flights\n> :face_with_rolling_eyes: Oh, and I can tell pretty terrible jokes")
  })

  wit.hears('thanks',0.5, function(bot, message, outcome) {
    bot.reply(message, "> Where's the blushing bot emoji when you need it...")
  })

  wit.hears('name',0.5, function(bot, message, outcome) {
    bot.reply(message, "> My name is Reverend Dr. Raymond Arther James III, Esquire")
  })

  wit.hears('joke',0.5, function(bot, message, outcome) {
    jokes.get(function(error, msg) {
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
    bot.reply(message, "> Beep boop pssskt  :boom: I am a weather, one-way flight and joke bot but I learn from every interaction... \n> unlike most humans");
  })
})


/*
controller.hears('.*', 'direct_message,direct_mention', function(bot,message) {
  witbot.process(message.text, bot, message)
  //bot.reply(message,message.text)
  console.log('heard something: ', message.text)
})

//when witbot hears a hello above .5

*/
