------------------------------------------------------------
                      JUEGO DE SERPIENTE
------------------------------------------------------------

INSTALACIÓN

Abre el archivo HTML:
   - Abre el archivo `snake.html` en tu navegador web favorito.

------------------------------------------------------------

USO

- Controla la serpiente:
  - Utiliza las teclas de flecha del teclado para mover la serpiente en cuatro direcciones:
    - Arriba
    - Abajo
    - Izquierda
    - Derecha
  - También puedes utilizar los botones de control en pantalla (para el modo en celular).

- Objetivo del juego:
  - Come la comida (representada por un ícono de manzana) para aumentar tu puntuación y el tamaño de la serpiente.
  - Evita chocar contra las paredes del tablero o contra tu propio cuerpo, ya que esto terminará el juego.

- Reiniciar el juego:
  - Haz clic en el botón "Reiniciar" para reiniciar la partida después de perder.

- Ajustar la velocidad del juego:
  - Utiliza la barra deslizante para ajustar la velocidad del juego en tiempo real.

- Cambiar el tema:
  - Haz clic en el botón de alternar tema para cambiar entre modo claro y modo oscuro.

------------------------------------------------------------

ESTRUCTURA DEL JUEGO

- snake.html: 
  - Archivo HTML que contiene la estructura básica del juego, incluyendo el tablero de juego, controles y áreas de puntuación.

- snake.css:
  - Hoja de estilos que define la apariencia del juego, incluyendo colores, tamaños y disposición del tablero.

- snake.js:
  - Archivo JavaScript que contiene la lógica del juego. Implementa las funciones para mover la serpiente, actualizar la posición de la comida, manejar la puntuación y gestionar el estado del juego.

Funciones principales en script.js:

1. updateFoodPosition():
   - Actualiza la posición de la comida en el tablero.

2. handleGameOver():
   - Maneja el estado de "Fin del Juego" y muestra un mensaje al jugador.

3. changeDirection(event):
   - Cambia la dirección de la serpiente según la tecla presionada o el botón clicado.

4. initGame():
   - Inicializa la lógica del juego en cada intervalo de tiempo.

5. updateSpeed():
   - Actualiza la velocidad del juego según lo establecido por el usuario.

------------------------------------------------------------

CONTRIBUCIONES

Las contribuciones son bienvenidas. Si deseas mejorar el juego o agregar nuevas funcionalidades, siéntete libre.

------------------------------------------------------------

LICENCIA

Este proyecto está bajo la Licencia de Xiao Mendez 

------------------------------------------------------------