'use strict';

// Select elements
const scoreEls = document.querySelectorAll('.score');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currScoreEl = document.querySelector('.current-score');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

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

// function to switch player
function switchPlayer() {
  if (player1El.classList.contains('player--active')) {
    player1El.classList.remove('player--active');
    player2El.classList.add('player--active');
  } else {
    player2El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
}

// add click listener to roll button
btnRoll.addEventListener('click', function () {
  let rolledNumber = rollADie();

  if (rolledNumber === 1) switchPlayer();
  else {
  }
});

// add click listener to new game button
btnNew.addEventListener('click', resetGame);
