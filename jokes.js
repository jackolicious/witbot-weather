var request = require('request')

module.exports = function() {
  return new Jokes()
}

function Jokes() {
  var self = this

  self.get = function(fn) {
    var numbers = new Array(9);
    numbers[0] = 'Donald Trump'
    numbers[1] = 'A wall on the Mexican border'
    numbers[2] = 'Curl the ear'
    numbers[3] = 'Geech\'s showering habits'
    numbers[4] = 'A man walks into a bar.\n Ow.'
    numbers[5] = 'How did the scottish farmer find the sheep in the tall grass?\n Satisfying.'
    numbers[6] = 'What do scientists and vegetables have in common?\n Stephen Hawking'
    numbers[7] = 'What did the Jewish pedophile say to the kids?\n Hey kids, easy on the candy!'
    numbers[8] = 'http://poncho.is/'

    var index = Math.floor(Math.random() * (numbers.length + 1));

    fn(null,numbers[index])
  }
}
