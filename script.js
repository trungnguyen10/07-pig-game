'use strict';

const numberOfPlayer = 2;

// Select elements
const scoreEls = document.querySelectorAll('.score');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currScoreEl = document.querySelector('.current-score');

// function to set game to starting conditions
function resetGame() {
  for (let element of scoreEls) element.textContent = 0;
  diceEl.classList.add('hidden');
  currScoreEl.textContent = 0;
}

resetGame();

// "roll a die" function return the rolled number (from 1 to 6)
function rollADie() {
  const randomNumber = Math.trunc(Math.random() * 6 + 1);
  console.log(randomNumber);

  //display the die image corresponding to the rolled number
  let text = 'dice-' + randomNumber + '.png';
  diceEl.src = text;
  diceEl.classList.remove('hidden');

  return randomNumber;
}

// Get the active player number return 0 for 1st player and 1 for 2nd player
function getActivePlayerNumber() {
  const playersEl = document.querySelectorAll('.player');
  let i = 0;
  for (; i < playersEl.length; i++) {
    if (playersEl[i].classList.contains('player--active')) break;
  }
  return i;
}

// function to switch player
function switchPlayer() {
  let i = getActivePlayerNumber();

  let activePlayerEl = document.querySelector(`.player--${i}`);
  activePlayerEl.classList.remove('player--active');
  activePlayerEl.querySelector('.current-score').textContent = 0;

  let otherPlayer = document.querySelector(
    `.player--${numberOfPlayer - 1 - i}`
  );
  otherPlayer.classList.add('player--active');
}

// function to add rolled number to current socre of active player
function addToCurrentScore(rolledNumber) {
  let i = getActivePlayerNumber();
  let activePlayerEl = document.querySelector(`.player--${i}`);
  let currentScore = Number(
    activePlayerEl.querySelector('.current-score').textContent
  );
  console.log(activePlayerEl.querySelector('.current-score').textContent);
  activePlayerEl.querySelector('.current-score').textContent =
    currentScore + rolledNumber;
}

// add click listener to roll button
btnRoll.addEventListener('click', function () {
  let rolledNumber = rollADie();

  if (rolledNumber === 1) switchPlayer();
  else {
    addToCurrentScore(rolledNumber);
  }
});

// add click listener to new game button
btnNew.addEventListener('click', resetGame);
