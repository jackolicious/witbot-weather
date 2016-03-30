module.exports = function() {
  return new Jokes()
}

function Jokes() {
  var self = this

  self.get = function(fn) {
    var numbers = [];
    numbers[0] = '> Donald Trump \n> :flag-us:'
    numbers[1] = '> A wall on the Mexican border \n> :flag-mx:'
    numbers[2] = '> Curl the ear \n> :elephant:'
    numbers[3] = '> Geech\'s showering habits \n> :shower:'
    numbers[4] = '> A man walks into a bar.\n> Ow. :face_with_head_bandage:'
    numbers[5] = '> How did the scottish farmer find the sheep in the tall grass?\n> Satisfying. :sheep:'
    numbers[6] = '> What did the Jewish pedophile say to the kids?\n> Hey kids, easy on the candy!'
    numbers[7] = '> http://poncho.is/'
    //numbers[8] = '> '

    var index = Math.floor(Math.random() * (numbers.length + 1));

    fn(null,numbers[index])
  }
}
