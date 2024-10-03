const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const hitSound = document.getElementById('hit-sound');
const missSound = document.getElementById('miss-sound');
let score = 0;
let timeLeft = 30;
let moleTimer;

// 隨機出現地鼠
function showMole() {
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const mole = randomHole.querySelector('.mole');
  mole.classList.remove('hidden');

  setTimeout(() => {
    mole.classList.add('hidden');
  }, 1000);
}

// 開始遊戲
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;

  moleTimer = setInterval(() => {
    showMole();
    timeLeft--;

    if (timeLeft === 0) {
      clearInterval(moleTimer);
    }

    timeLeftDisplay.textContent = timeLeft;
  }, 1000);
}

// 點擊地鼠
holes.forEach(hole => {
  hole.addEventListener('click', (e) => {
    const mole = e.target.closest('.mole');

    if (mole && !mole.classList.contains('hidden')) {
      score++;
      scoreDisplay.textContent = score;
      hitSound.play();
      mole.classList.add('hidden');
    } else {
      score--;
      scoreDisplay.textContent = score;
      missSound.play();
    }
  });
});

document.getElementById('start-btn').addEventListener('click', startGame);
