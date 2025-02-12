
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const bgMusic = document.getElementById('bg-music');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Retrieve player names from localStorage
const player1Name = localStorage.getItem('player1Name') || 'Player 1';
const player2Name = localStorage.getItem('player2Name') || 'Player 2';

// Update player names in the UI
document.getElementById('name--0').textContent = player1Name;
document.getElementById('name--1').textContent = player2Name;

// Starting conditions

// Function to play background music
function playBackgroundMusic() {
    bgMusic.play();
}

function pauseBackgroundMusic() {
    bgMusic.pause();
}

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    playBackgroundMusic(); // Start background music
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${dice}.png`;

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // Store current score for display before alert
        const currentScoreToShow = currentScore;

        localStorage.setItem(`player${activePlayer + 1}Score`, scores[activePlayer]);

        // 2. Check if player's score is >= 50 (changed from 100)
        if (scores[activePlayer] >= 50) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            // Update UI with final score before alert
            document.getElementById(`current--${activePlayer}`).textContent = currentScoreToShow;

            // Display winning message after showing final score
            const winnerName = localStorage.getItem(`player${activePlayer + 1}Name`);
            setTimeout(function () {
                alert(`${winnerName} has won the game!`);
            }, 500); // Adjust delay if necessary

            // Add winner styles or any additional actions
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            
            pauseBackgroundMusic(); // Pause background music on game over
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});



btnNew.addEventListener('click', init);
