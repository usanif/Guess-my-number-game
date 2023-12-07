'use strict';

//Create validate logic
let secretNumber = generateRandomNumber();
const maxAttempts = 3;
let attempts = 1;

document.querySelector('.score').textContent = '?';
document.querySelector('.number').textContent = '?';

// // Function to generate a random number between 1 and 15

function generateRandomNumber() {
  return Math.trunc(Math.random() * 14) + 1;
}

// //1. Function to restart game
// //2. secret number will reset
// //3. message will reset
// //4. guess will be hidden
// //5. body colour will be reset
// //6. number coloum will be reset

function restartGame() {
  secretNumber = generateRandomNumber();
  attempts = 1;
  document.querySelector('.number').textContent = '?'; // Change displayed number to a placeholder
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.gameMsg').textContent = '';
}

//function to handle each game attempt

document.querySelector('.check').addEventListener('click', function () {
  const playerGuess = Number(document.querySelector('.guess').value);

  //console.log(playerGuess, typeof playerGuess);
  //Check the number is correct
  // Check if no number is entered
  if (!playerGuess) {
    document.querySelector('.message').textContent = '⛔️ No number!';
    return playerGuess;
  }
  const difference = Math.abs(secretNumber - playerGuess);
  if (difference === 0) {
    document.querySelector('.gameMsg').textContent = 'You won it!';
  } else if (difference <= 7) {
    document.querySelector('.gameMsg').textContent = 'You are very close!';
  } else if (difference <= 14) {
    document.querySelector('.gameMsg').textContent = 'You are getting closer.';
  } else {
    document.querySelector('.gameMsg').textContent = 'You are far away.';
  }
  // Check if the guess is correct
  if (attempts < maxAttempts) {
    if (playerGuess === secretNumber) {
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.score').textContent = secretNumber;
      document.querySelector('.message').textContent = '🏆 You won!';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      // Set a timer to restart the game after 5 seconds
      let countdown = 5;
      const countdownInterval = setInterval(function () {
        document.querySelector(
          '.highscore'
        ).textContent = `${countdown} seconds.`;
        countdown--;

        if (countdown < 0) {
          clearInterval(countdownInterval);
          restartGame(); // Restart the game
        }
      }, 1000);
    } else {
      attempts++;
      document.querySelector(
        '.message'
      ).textContent = `Wrong guess, now you have ${
        maxAttempts - attempts + 1
      } attempts remaining.`;
      document.querySelector('.guess').value = '';
    }
  } else {
    document.querySelector('body').style.backgroundColor = '#FF0000';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector(
      '.message'
    ).textContent = `You lost the game and the secret number was ${secretNumber}, Please restart.`;
  }
});

// Restart the game button
document.querySelector('.again').addEventListener('click', restartGame);
