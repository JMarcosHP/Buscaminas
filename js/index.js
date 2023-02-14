const squares = document.querySelectorAll('.square');
const scoreValue = document.querySelector('#scoreValue');
const timeValue = document.querySelector('#timeValue');
const startBtn = document.querySelector('#startBtn');

let score = 0;
let timer
let gameStarted = false;
let mines = [];

function cronos() {
  let minutes = 2
  let seconds = 0

  timer = setInterval(() => {
    if (seconds === 0) {
      minutes--
      seconds = 60
    }

    seconds--
    timeValue.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    if (minutes === 0 && seconds === 0) {
      clearInterval(timer)
      alert('¡Se acabó el tiempo')
      endGame()
    }
  }, 1000);
}

// Detener cronos
function stopCronos() {
  clearInterval(timer)
}

// genera las minas en casillas aleatorias
function genMines() {
  for (let i = 0; i < 4; i++) {
    let randomSquare = Math.floor(Math.random() * squares.length);
    if (mines.indexOf(randomSquare) === -1) {
      mines.push(randomSquare);
    } else {
      i--;
    }
  }
}

// manejador de evento al hacer clic en un cuadrado
squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (!gameStarted) {
      return;
    }

    if (mines.indexOf(index) !== -1) {
      stopCronos()
      square.style.backgroundColor = "red"
      endGame();
    } else {
      square.style.backgroundColor = 'lightgreen';
      score += 10;
      scoreValue.textContent = score;
      square.style.pointerEvents = 'none'; // deshabilita los clicks
      if (--squaresLeft === 0) {
        stopCronos()
        endGame();
      }
    }
  });
});

// manejador de evento al hacer clic en el botón de inicio
startBtn.addEventListener('click', startGame);


let squaresLeft = 15;

function startGame() {
  gameStarted = true;
  cronos()
  //startBtn.style.display = 'none';
  startBtn.disabled = true
  squaresLeft = 15
  genMines()
  
}

function endGame() {
  gameStarted = false;

  // muestra el resultado y la puntuación final
  squares.forEach((square, index) => {
    if (mines.indexOf(index) !== -1) {
      square.style.backgroundColor = 'red';
    }
  });

  let message = 'Has perdido';
  if (squaresLeft === 0) {
    message = 'Has ganado';
    score += (timer * 10) + (squaresLeft * 5);
    scoreValue.textContent = score
  }

  alert(`${message} con una puntuación de ${score}`);
}
