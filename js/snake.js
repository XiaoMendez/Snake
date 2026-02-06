// Codigo de funcionamiento inspirado de GeekForGeeks: https://www.geeksforgeeks.org/create-a-snake-game-using-html-css-and-javascript/

// Seleccionamos los elementos del DOM que vamos a usar
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
const speedInput = document.querySelector("#speed"); 
const speedValue = document.querySelector("#speed-value");
const restartBtn = document.querySelector("#restart");
const themeToggle = document.querySelector("#toggle-theme");

// Variables del juego
let gameOver = false; // Estado del juego, determina si ha terminado
let foodX, foodY; // Posiciones de la comida
let snakeX = 15, snakeY = 15; // Posición inicial de la serpiente
let velocityX = 0, velocityY = 0; // Dirección de movimiento de la serpiente
let snakeBody = []; // Cuerpo de la serpiente
let setIntervalId; // ID de la función setInterval
let score = 0; // Puntuación del jugador
let gameSpeed = speedInput.value; // Velocidad del juego
let highScore = localStorage.getItem("high-score") || 0; // Máxima puntuación guardada en localStorage
highScoreElement.innerText = `🏆: ${highScore}`; // Se muestra la máxima puntuación

// Función para actualizar la posición de la comida
const updateFoodPosition = () => {
    let availableSpaces = new Set(); // Conjunto para almacenar espacios disponibles
    // Rellenar el conjunto con todas las posiciones posibles en el tablero
    for (let x = 1; x <= 30; x++) {
        for (let y = 1; y <= 30; y++) {
            availableSpaces.add(`${x},${y}`);
        }
    }
    // Eliminar de los espacios disponibles las posiciones ocupadas por el cuerpo de la serpiente
    snakeBody.forEach(([x, y]) => availableSpaces.delete(`${x},${y}`));

    // Elegir una nueva posición aleatoria para la comida
    if (availableSpaces.size > 0) {
        let randomIndex = Math.floor(Math.random() * availableSpaces.size);
        let newFood = [...availableSpaces][randomIndex].split(",");
        [foodX, foodY] = newFood.map(Number); // Asignar las nuevas coordenadas de la comida
    }
};

// Función que maneja el fin del juego
const handleGameOver = () => {
    clearInterval(setIntervalId); // Detener el juego
    alert('¡Has perdido! Pulsa "Reiniciar" para jugar de nuevo.');
    gameOver = true; // Cambiar el estado a "game over"
};

// Función para cambiar la dirección de la serpiente
const changeDirection = e => {
    // Comprobar la tecla pressionada y cambiar la dirección de la serpiente
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0; velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0; velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1; velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1; velocityY = 0;
    }
};

// Asignar eventos de click a los controles
controls.forEach(button => 
    button.addEventListener("click", () => changeDirection({ key: button.dataset.key }))
);

// Inicializar el juego
const initGame = () => {
    if (gameOver) return; // Si el juego ha terminado, no hacer nada

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // HTML para la comida

    // Comprobar si la serpiente ha comido la comida
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition(); // Actualizar la posición de la comida
        snakeBody.push([snakeX, snakeY]); // Extender el cuerpo de la serpiente
        score++; // Aumentar la puntuación
        highScore = Math.max(score, highScore); // Actualizar la máxima puntuación
        localStorage.setItem("high-score", highScore); // Guardar máxima puntuación en localStorage
        scoreElement.innerText = `🍎: ${score}`; // Mostrar puntuación actual
        highScoreElement.innerText = `🏆: ${highScore}`; // Mostrar máxima puntuación
    }
    
    // Actualizar la posición de la serpiente
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Comprobar si la serpiente se ha salido del tablero
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        handleGameOver(); // Terminar el juego
        return;
    }

    // Actualizar el cuerpo de la serpiente
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]]; // Mover la parte trasera hacia delante
    }
    
    snakeBody[0] = [snakeX, snakeY]; // Actualizar la cabeza de la serpiente

    // Generar HTML para mostrar la serpiente en el tablero
    snakeBody.forEach(([x, y], index) => {
        html += `<div class="head" style="grid-area: ${y} / ${x}"></div>`;
        // Comprobar si la serpiente se ha chocado con sí misma
        if (index !== 0 && snakeBody[0][0] === x && snakeBody[0][1] === y) {
            handleGameOver(); // Terminar el juego
        }
    });

    playBoard.innerHTML = html; // Actualizar el tablero
};

// Función para actualizar la velocidad del juego
const updateSpeed = () => {
    gameSpeed = speedInput.value; // Obtener la nueva velocidad del input
    speedValue.innerText = gameSpeed; // Mostrar la nueva velocidad
    clearInterval(setIntervalId); // Limpiar el intervalo actual
    setIntervalId = setInterval(initGame, gameSpeed); // Iniciar el nuevo intervalo
};

// Función para reiniciar el juego
const restartGame = () => {
    gameOver = false; // Reiniciar el estado del juego
    snakeX = 15; snakeY = 15; // Reiniciar la posición de la serpiente
    velocityX = 0; velocityY = 0; // Reiniciar la dirección de la serpiente
    snakeBody = []; // Reiniciar el cuerpo de la serpiente
    score = 0; // Reiniciar la puntuación
    scoreElement.innerText = "🍎: 0"; // Mostrar puntuación reiniciada
    updateFoodPosition(); // Reubicar la comida
    updateSpeed(); // Actualizar la velocidad
    initGame(); // Inicializar el juego
};

// Función para alternar entre tema claro y oscuro
const toggleTheme = () => {
    document.body.classList.toggle("dark-mode"); // Cambiar la clase para tema oscuro
};

// Agregar listener para el input de velocidad
speedInput.addEventListener("input", updateSpeed);
// Agregar listener para el botón de reinicio
restartBtn.addEventListener("click", restartGame);
// Agregar listener para el botón de cambio de tema
themeToggle.addEventListener("click", toggleTheme);
// Agregar listener para detectar teclas
document.addEventListener("keydown", changeDirection);
// Inicializar la posición de la comida y el juego
updateFoodPosition();
// Iniciar el juego
setIntervalId = setInterval(initGame, gameSpeed);

