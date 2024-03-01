const wordDisplay = document.getElementById('word');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const guessesCount = document.getElementById('guessesCount');
const possibleWordsList = document.getElementById('possibleWordsList');

const words = ['apple', 'banana', 'orange', 'strawberry', 'grape'];

let randomizedWord = '';
let maskedWord = '';
let guesses = 0;

function newGame() {
  guesses = 0;
  randomizedWord = words[Math.floor(Math.random() * words.length)];
  maskedWord = '*'.repeat(randomizedWord.length);
  wordDisplay.textContent = maskedWord;
  guessesCount.textContent = 'Number of guesses: 0';
  possibleWordsList.textContent = 'Possible words: ' + words.join(', ');
}

function replaceFoundChars(letter) {
  const wordArray = maskedWord.split('');
  for (let i = 0; i < randomizedWord.length; i++) {
    if (randomizedWord[i] === letter) {
      wordArray[i] = letter;
    }
  }
  maskedWord = wordArray.join('');
}

function win() {
  if (!maskedWord.includes('*')) {
    message.textContent = `Congratulations! You guessed the word "${randomizedWord}" in ${guesses} guesses!`;
    newGame();
  }
}

guessBtn.addEventListener('click', () => {
  const guess = guessInput.value.toLowerCase();
  if (guess.length === 1) {
    guesses++;
    replaceFoundChars(guess);
    wordDisplay.textContent = maskedWord;
    win();
  } else if (guess.length > 1) {
    if (guess === randomizedWord) {
      guesses++;
      message.textContent = `Congratulations! You guessed the word "${randomizedWord}" in ${guesses} guesses!`;
      newGame();
    } else {
      message.textContent = 'Wrong guess!';
    }
  }
  guessesCount.textContent = 'Number of guesses: ' + guesses;
  guessInput.value = '';
});

newGame();

