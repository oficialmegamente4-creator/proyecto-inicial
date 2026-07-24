const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d')
const gameOverScreen = document.getElementById('game-over')
const restartBtn = document.getElementById('restart-btn')

const GRID_SIZE = 20;
const SNAKE_SIZE = GRID_SIZE;
const FOOD_SIZE = GRID_SIZE;

let snake, food, dx, dy, blinkCounter;
let gamePause = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

let currentScoreElem = document.getElementById('current-score');
let highScoreElem = document.getElementById('high-score');

// Inicio del juego
function initializeGame() {
    // Configurar los segmentos iniciales de la serpiente
    snake = [
        { x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE, y: Math.floor(canvas.height / 2 / GRID_SIZE) * GRID_SIZE },
        { x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE, y: (Math.floor(canvas.height / 2 / GRID_SIZE) + 1) * GRID_SIZE },
    ];
    // Configuracion la posición inicial de la comida y la dirección
    food = {
        ...generateFoodPosition(),
        dx: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
        dy: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE
    };
    // Establecer dirección inicial de la serpiente 
    dx = 0;
    dy = -GRID_SIZE;
    blinkCounter = 0;
    score = 0;
    currentScoreElem.textContent = score;
    highScoreElem.textContent = highScore;
}

initializeGame();

// Manejar las entradas del teclado para mover la serpiente
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -GRID_SIZE;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = GRID_SIZE;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -GRID_SIZE;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = GRID_SIZE;
                dy = 0;
            }
            break;
    }
});

// Generar la posición de la comida que no choque con la serpiente
function generateFoodPosition() {
    while (true) {
        let newFoodPosition = {
            x: Math.floor(Math.random() * canvas.width / GRID_SIZE) * GRID_SIZE,
            y: Math.floor(Math.random() * canvas.height / GRID_SIZE) * GRID_SIZE
        };

        let collisionWithSnake = false;
        for (let segment of snake) {
            if (segment.x === newFoodPosition.x && segment.y === newFoodPosition.y) {
                collisionWithSnake = true;
                break;
            }
        }

        // Devuelver la posición si no hay una colisión
        if (!collisionWithSnake) {
            return newFoodPosition;
        }
    }
}

// Revisa si hay colisiones con la pared o contigo mismo
function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Función principal de actualización del juego
function update() {
    if (gamePause) return;

    // Calcula la nueva posición de la cabeza de la serpiente
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Revisa si hay colisiones
    if (checkCollision()) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreElem.textContent = highScore;
        }
        gameOver()
        return;
    }

    // Revisar si la serpiente está comiendo comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        currentScoreElem.textContent = score;
        food = {
            ...generateFoodPosition(),
            dx: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
            dy: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE
        };

        // Revisa si se cumple la condición de victoria (la serpiente ocupa toda la pantalla)
        if (snake.length === (canvas.width / GRID_SIZE) * (canvas.height / GRID_SIZE)) {
            gameWin();
            return;
        }
    } else {
        snake.pop(); // Remove tail segment
    }

    // Actualizar la posición de la comida
    if (blinkCounter % 4 === 0) {
        food.x += food.dx;
        food.y += food.dy;
        // handle food collisions with wail
        if (food.x < 0) {
            food.dx = -food.dx;
            food.x = 0;
        }
        if (food.x >= canvas.width) {
            food.dx = -food.dx;
            food.x = canvas.width - GRID_SIZE;
        }
        if (food.y < 0) {
            food.dy = -food.dy;
            food.y = 0;
        }
        if (food.y >= canvas.height) {
            food.dy = -food.dy;
            food.y = canvas.height - GRID_SIZE;
        }
    }


    blinkCounter++;
    draw(); // Dibuja los objetos del juego
}

// Dibuja la cuadrícula de fondo
function drawGrid() {
    context.strokeStyle = "#AAA";
    for (let i = 0; i < canvas.width; i += GRID_SIZE) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
    }
    for (let j = 0; j < canvas.height; j += GRID_SIZE) {
        context.beginPath();
        context.moveTo(0, j);
        context.lineTo(canvas.width, j);
        context.stroke();
    }
}

// Dibuja los objetos del juego (serpiente y comida)
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    for (const segment of snake) {
        context.fillStyle = 'green';
        context.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
    }
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
}

// manejar el estado de fin de juego 
function gameOver() {
    gamePause = true;
    gameOverScreen.style.display = 'flex';
}

// manejar el estado de victoria del juego
function gameWin() {
    gamePause = true;
    alert("¡Felicidades! ¡Ganaste!");
    initializeGame();
}

// Reiniciar el juego cuando se haga clic en el botón de reinicio
restartBtn.addEventListener('click', function () {
    gameOverScreen.style.display = 'none';
    gamePause = false;
    initializeGame();
    update();
});

// Llama a la función de actualización cada 100 ms
setInterval(update, 100);

// Pausa el juego cuando la ventana pierda el foco
window.addEventListener('blur', function () {
    gamePause = true;
});
z
// Reanudar el juego cuando la ventana gane foco
window.addEventListener('focus', function () {
    gamePause = false;
    update();
});