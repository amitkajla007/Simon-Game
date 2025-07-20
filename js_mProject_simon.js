let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let canClick = false; // ✅ New flag to prevent early clicks

const btns = ["red", "yellow", "green", "purple"];
const h2 = document.querySelector("h2");

// Start the game
document.addEventListener("keydown", function () {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = `Level ${level}`;
    setTimeout(levelUp, 500);
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  canClick = false; // block user clicks while showing sequence

  // Generate random color
  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  gameSeq.push(randColor);

  // Flash the new button
  const randBtn = document.getElementById(randColor);
  gameFlash(randBtn);

  // ✅ Allow clicking after flashing
  setTimeout(() => {
    canClick = true;
  }, 500);
}

function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(() => {
    btn.classList.remove("gameflash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 300);
}

function checkAnswer(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);
    resetGame();
  }
}

function btnPressed() {
  if (!canClick) return; // ❌ Don't allow early clicking

  const btn = this;
  const userColor = btn.id;

  userSeq.push(userColor);
  userFlash(btn);

  checkAnswer(userSeq.length - 1);
}

// Attach click listeners to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", btnPressed);
});

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  canClick = false;
}
