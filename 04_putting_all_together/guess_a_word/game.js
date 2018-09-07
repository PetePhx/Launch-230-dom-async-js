var $message = $('#message');
var $letters = $('#spaces');
var $guesses = $('#guesses');
var $apples = $('#apples');
var $replay = $('#replay');

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
  if (this.word === undefined) this.displayMessage('Sorry, You Ran Out of Words!');

  this.word = this.word.split('');
  this.init();
}

Game.prototype = {
  init: function () {
    this.createBlanks();
    this.resetDisplay();
  },
  createBlanks: function () {
    var spaces = '<span></span>'.repeat(this.word.length);
    $letters.find('span').remove();
    $letters.append(spaces);
    this.spaces = $('#spaces span');
  },
  resetDisplay : function () {
    $('body').removeClass('win lose');
    $apples.removeClass();
    this.spaces.text('');
    $guesses.find('span').remove();
  },
  displayMessage: function (text) {
    $message.text(text);
  },
  processLetter: function (letter) {
    var positions = [];
    var that = this;
    if (!/[a-z]/.test(letter)) return;
    if (that.letters_guessed.includes(letter)) return;

    that.letters_guessed.push(letter);
    console.log(that.word);
    if (that.word.includes(letter)) {
      that.word.forEach(function (elm, idx) {
        if (elm === letter) positions.push(idx);
      });
      that.correct_spaces += positions.length;
      positions.forEach(function (idx) {
        that.spaces.eq(idx).text(letter.toUpperCase());
      });
      if (that.correct_spaces === that.word.length) {
        $(document).off('keypress');
        that.displayMessage('YOU WON!');
        $('body').addClass('win');
      }
    } else {
      $apples.removeClass();
      that.incorrect += 1;
      $apples.addClass('guess_' + that.incorrect);
      if (that.incorrect === 6) {
        $(document).off('keypress');
        that.displayMessage('YOU LOST!');
        that.spaces.each(function (idx) { $(this).text(game.word[idx]); });
        $('body').addClass('lose');
      }
    }
    $guesses.append('<span>' + letter.toUpperCase() + '</span>');
  },
};

var keypressCallback = function (e) {
  e.preventDefault();
  var letter = e.key.toLowerCase();
  game.processLetter(letter);
};

$replay.on('click', function (e) {
  e.preventDefault();
  game = new Game();
  game.init();
  $(document).on('keypress', keypressCallback);
});

$replay.trigger('click');
