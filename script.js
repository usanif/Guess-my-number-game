'use strict';

//Create validate logic

let secretNumber = generateRandomNumber();
const maxAttempts = 6;
let attempts = 0;
document.querySelector('.score').textContent = '?';
document.querySelector('.number').textContent = '?';

// Function to generate a random number between 1 and 15

function generateRandomNumber() {
  return Math.trunc(Math.random() * 14) + 1;
}

//1. Function to restart game
//2. secret number will reset
//3. message will reset
//4. guess will be hidden
//5. body colour will be reset
//6. number coloum will be reset

function restartGame() {
  secretNumber = generateRandomNumber();
  attempts = 0;
  document.querySelector('.number').textContent = '?'; // Change displayed number to a placeholder
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
}

//function to handle each game attempt

document.querySelector('.check').addEventListener('click', function () {
  const playerGuess = Number(document.querySelector('.guess').value);
  // console.log(playerGuess, typeof playerGuess);

  //Check the number is correct

  if (!playerGuess) {
    document.querySelector('.message').textContent = '⛔️ No number!';

    //1. If the number is not equal to secret number (check if guess is correct)//
    //2. check the attempts of player which is max 6 attempts
    //3. Won number will be revealed
    //4. the colour of background will change to green
    //5. After win the number reveal coloum will become wide
  } else if (attempts < maxAttempts) {
    if (playerGuess === secretNumber) {
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.score').textContent = secretNumber;
      document.querySelector('.message').textContent = '🏆 You won!';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      // 1. Set a timer to restart the game after 5 seconds
      // 2. Display a message with a countdown timer

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

      //When guess is wrong it display message minus remaining attempt//
    } else {
      attempts++;

      document.querySelector(
        '.message'
      ).textContent = `Wrong guess, now you have ${
        maxAttempts - attempts
      } attempts remaining.`;
    }

    //When attempt is over it will reveal the secret number and ask to click restart button//
  } else {
    document.querySelector('body').style.backgroundColor = '#FF0000';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector(
      '.message'
    ).textContent = `You lost the game and the secret number was ${secretNumber}, Please restart.`;
  }
});

// Restart the game button//

document.querySelector('.again').addEventListener('click', restartGame);
