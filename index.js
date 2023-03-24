const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// define as variáveis do jogo
let snake = [{x: 10, y: 10}];
let direction = "right";
let food = {x: 0, y: 0};
let score = 0;

// desenha a cobra
function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
  }
}

// desenha a comida
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

// move a cobra
function moveSnake() {
  let head = {x: snake[0].x, y: snake[0].y};
  if (direction === "right") {
    head.x++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    generateFood();
    score++;
  } else {
    snake.pop();
  }
}

// gera a comida em uma posição aleatória
function generateFood() {
  let x = Math.floor(Math.random() * canvas.width / 10);
  let y = Math.floor(Math.random() * canvas.height / 10);
  food = {x: x, y: y};
}

// verifica se a cobra colidiu com a parede ou com ela mesma
function checkCollision() {
  let head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / 10 ||
      head.y < 0 || head.y >= canvas.height / 10) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// atualiza o jogo
function update() {
  moveSnake();
  if (checkCollision()) {
    clearInterval(gameInterval);
    alert("Game over! Score: " + score);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
  }
}

// evento de tecla pressionada
document.addEventListener("keydown", event => {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode
