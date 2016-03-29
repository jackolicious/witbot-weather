var Botkit = require('botkit')
var Witbot = require('witbot')

var slackToken = process.env.SLACK_TOKEN
var witToken = process.env.WIT_TOKEN
var openWeatherApiKey = process.env.OPENWEATHER_KEY

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

controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
  var wit = witbot.process(message.text, bot, message)

  wit.hears('hello',0.5, function(bot, message, outcome) {
    bot.reply(message, 'Greetings human! :robot_face: :wave:')
  })

  wit.hears('how_are_you',0.5, function(bot, message, outcome) {
    bot.reply(message, "I\'m a bot. I\'m doing as well as could be expected. ¯\\_(ツ)_/¯")
  })

  wit.hears('thanks',0.5, function(bot, message, outcome) {
    bot.reply(message, "Where's the blushing bot emoji when you need it...")
  })

  wit.hears('name',0.5, function(bot, message, outcome) {
    bot.reply(message, "My name is Reverend Dr. Raymond Arther James III, Esquire")
  })

  wit.hears('joke',0.5, function(bot, message, outcome) {
    //bot.reply(message, numbers[randomIntInc(0,numbers.length-1)])
    jokes.get(function(error, msg) {
      bot.reply(message, msg)
    })
  })

  wit.hears('weather',0.5, function(bot, message, outcome) {
    console.log(outcome.entities.location)
    if(!outcome.entities.location || outcome.entities.location.length == 0) {
      bot.reply(message,"I'm a bot, not a psychic. I need your location first...");
      return
    }
    var location = outcome.entities.location[0].value
    weather.get(location, function(error, msg) {
      if (error) {
        console.log(error)
        bot.reply(message, "Beep boop pssskt  :boom:")
        return
      }
      bot.reply(message, msg)
    })
  })

  wit.otherwise(function (outcome) {
    bot.reply(message, "Beep boop pssskt  :boom: I am a weather and joke bot but I learn from every interaction... unlike most humans");
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
