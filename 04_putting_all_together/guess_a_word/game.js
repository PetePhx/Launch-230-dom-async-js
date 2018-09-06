var $message = $('#message');
var $letters = $('#spaces');
var $guesses = $('#guesses');
var $apples = $('#apples');

var randomWord = (function () {

  var wordsArr = ['apple', 'banana', 'orange', 'pear'];

  return function () {
    var idx = Math.floor(Math.random() * wordsArr.length);
    var word = wordsArr[idx];
    wordsArr.splice(idx, 1);
    return word;
  };
})();

function Game () {
  this.incorrect = 0;
  this.letters_guessed = [];
  this.correct_spaces = 0;
  this.word = randomWord();
  if (this.word === undefined) this.displayMessage('Sorry, ran out of words!');

  this.word = this.word.split('');
  this.init();
}

Game.prototype = {
  init: function () {
    this.createBlanks();
  },
  createBlanks: function () {
    var spaces = '<span></span>'.repeat(this.word.length);
    $letters.find('span').remove();
    $letters.append(spaces);
    this.spaces = $('#spaces span');
  },
  displayMessage: function (text) {
    $message.text(text);
  },
};


// console.log(randomWord());
// console.log(randomWord());
// console.log(randomWord());
// console.log(randomWord());
