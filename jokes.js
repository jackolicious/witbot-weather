module.exports = function() {
  return new Jokes()
}

function Jokes() {
  var self = this

  self.get = function(fn) {
    var jokes = [];
    jokes[0] = '> Donald Trump \n> :flag-us:'
    jokes[1] = '> A wall on the Mexican border \n> :flag-mx:'
    jokes[2] = '> Curl the ear \n> :elephant:'
    jokes[3] = '> Geech\'s showering habits \n> :shower:'
    jokes[4] = '> A man walks into a bar.\n> Ow. :face_with_head_bandage:'
    jokes[5] = '> How did the scottish farmer find the sheep in the tall grass?\n> Satisfying. :sheep:'
    jokes[6] = '> What did the Jewish pedophile say to the kids?\n> Hey kids, easy on the candy!'
    jokes[7] = '> http://poncho.is/'
    jokes[8] = '> What would Abraham Lincoln say if he found out there was a movie about him slaying vampires? \n>What\'s a movie?'
    jokes[9] = '> What happens when you don\'t pay your exorcist? \n> You get repossessed. :ghost:'
    jokes[10] = '> What do you get when you cross a penis and a potato? \n> Thrown out of the super market.'

    var index = Math.floor(Math.random() * (jokes.length + 1));

    fn(null,jokes[index])
  }
}
