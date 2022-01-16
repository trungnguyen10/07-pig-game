'use strict';

const numberOfPlayer = 2;

// Select elements
const scoreEls = document.querySelectorAll('.score');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currScoreEls = document.querySelectorAll('.current-score');

// function to set game to starting conditions
function resetGame() {
  for (let element of scoreEls) element.textContent = 0;
  diceEl.classList.add('hidden');
  for (let element of currScoreEls) element.textContent = 0;

  // reset active player to player--0
  let i = 0;
  document.querySelector(`.player--${i++}`).classList.add('player--active');
  for (; i < numberOfPlayer; i++)
    document.querySelector(`.player--${i}`).classList.remove('player--active');
}

resetGame();

// "roll a die" function return the rolled number (from 1 to 6)
function rollADie() {
  const randomNumber = Math.trunc(Math.random() * 6 + 1);
  // console.log(`rolled number ${randomNumber}`);

  //display the die image corresponding to the rolled number
  let text = 'dice-' + randomNumber + '.png';
  diceEl.src = text;
  diceEl.classList.remove('hidden');

  return randomNumber;
}

// Get the active player number return 0 for 1st player and 1 for 2nd player
function getActivePlayerNumber() {
  const playerEls = document.querySelectorAll('.player');
  let i = 0;
  for (; i < playerEls.length; i++) {
    if (playerEls[i].classList.contains('player--active')) break;
  }
  return i;
}

// function to switch player
function switchPlayer() {
  let i = getActivePlayerNumber();

  let activePlayerEl = document.querySelector(`.player--${i}`);
  activePlayerEl.classList.remove('player--active');
  activePlayerEl.querySelector('.current-score').textContent = 0;

  let nextActivePlayerNumber = (i + 1) % numberOfPlayer;
  let otherPlayer = document.querySelector(
    `.player--${nextActivePlayerNumber}`
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
  // console.log(`current score ${activePlayerEl.querySelector('.current-score').textContent}`);
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
