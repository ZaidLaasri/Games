let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];
let isRunning = true;
let score = 0;
let food_x;
let food_y;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;
// Vrai if changing_direction
let changing_direction = false;
// Obtenir l'élément Canvas
const snakeCanvas = document.getElementById("snakeCanvas");
// un contexte de dessin en deux dimensions
const snakeCanvas_ctx = snakeCanvas.getContext("2d");
mafonction();
function mafonction() {
  if (isRunning) {
    // Lancer le jeu
    DebutCanvas();
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        document.getElementById("wrapper2").style.display = "none";
        timer();
        main();

        gen_food();
      }
    });
  }
}

document.addEventListener("keydown", change_direction);
// fonction main appelée de manière répétée pour que le jeu continue de fonctionner.
function main() {
  //fin du jeu 
  if (fin_jeu()) {
    FinCanvas();
    stopTimer();
    debugger;
    let niveau;
    let nom = localStorage.getItem("id");
    let data = JSON.parse(nom);
    console.log(data);
    if (getNiveau() == "150") {
      niveau = "Facile";
    } else if (getNiveau() == "100") {
      niveau = "Moyen";
    } else {
      niveau = "Difficle";
    }

    const date = new Date();
    const jour = date.getDate().toString().padStart(2, "0");
    const mois = (date.getMonth() + 1).toString().padStart(2, "0");
    const annee = date.getFullYear();
    console.log(`${jour}/${mois}/${annee}`);

    let user = {
      id: data.id,
      score2: score,
      date: `${jour}/${mois}/${annee}`,
      niveau: niveau,
    };
    let json = JSON.stringify(user);
    localStorage.setItem("record", json);
    console.log("record ajouté");
    console.log(json);

    return;
  }
  changing_direction = false;
  if (isRunning) {
    setTimeout(function onTick() {
      DebutCanvas();
      dessinerCanvas();
      move_snake();
      dessinerSnake();
      drawFood();
      // apeller main toujours
      main();
    }, getNiveau());
  }
}
function DebutCanvas() {
  snakeCanvas_ctx.fillStyle = "Orange";
  //  Sélectionnez la couleur de la bordure du Canvas
  snakeCanvas_ctx.strokestyle = "Black";
  // dessiner un rectangle "rempli"
  snakeCanvas_ctx.font = "30px Arial";
  // dessiner la bordure
  snakeCanvas_ctx.fillText("Cliquer sur espace pour commencer", 60, 300);
}
function FinCanvas() {
  snakeCanvas_ctx.fillStyle = "white";
  //  Sélectionnez la couleur de la bordure du Canvas
  snakeCanvas_ctx.strokestyle = "Black";
  // dessiner un rectangle "rempli"
  snakeCanvas_ctx.font = "30px Arial";
  // dessiner la bordure
  snakeCanvas_ctx.fillText("Vous avez perdu !", 150, 300);
  document.getElementById("wrapper2").style.display = "block";
  document.getElementById("myButtonReprendre").style.display = "block";
}

document.getElementById("myButton").addEventListener("click", function () {
  document.getElementById("myForm").style.display = "block";
  snakeCanvas.style.display = "none";
  document.getElementById("score").innerHTML = "";
  document.getElementById("myButtonReprendre").style.display = "block";
  document.getElementById("chrono").style.display="none";
});

document
  .getElementById("myButtonReprendre")
  .addEventListener("click", function () {
    resetTimer();
    score = 0;
    document.getElementById("myForm").style.display = "none";
    snakeCanvas.style.display = "block";
    document.getElementById("chrono").style.display="block";
    document.getElementById("score").innerHTML = "Score :";
    document.getElementById("myButtonReprendre").style.display = "none";
    snakeCanvas_ctx.fillStyle = "White";

    // dessiner un rectangle "rempli"
    snakeCanvas_ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    // dessiner la bordure

    DebutCanvas();
    snake = [
      { x: 200, y: 200 },
      { x: 190, y: 200 },
      { x: 180, y: 200 },
      { x: 170, y: 200 },
      { x: 160, y: 200 },
    ];

    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        setTimeout(function onTick() {
          dessinerCanvas();
          move_snake();
          dessinerSnake();
          drawFood();
          // apeller main toujours
        }, getNiveau());
      }
    });
  });

function getNiveau() {
  var select = document.getElementById("niveau");
  var niveau = select.options[select.selectedIndex].value;
  //alert("Niveau sélectionné : " + niveau);
  return niveau;
}

function getCouleur() {
  var select = document.getElementById("couleur");
  var couleur = select.options[select.selectedIndex].value;
  //alert("Niveau sélectionné : " + niveau);
  return couleur;
}

// dessiner une bordure autour du Canvas
function dessinerCanvas() {
  //  Sélectionnez la couleur pour remplir le dessin
  snakeCanvas_ctx.fillStyle = "Orange";
  //  Sélectionnez la couleur de la bordure du Canvas
  snakeCanvas_ctx.strokestyle = "Black";
  // dessiner un rectangle "rempli"
  snakeCanvas_ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  // dessiner la bordure
  snakeCanvas_ctx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
}

// Dessiner le snake
function dessinerSnake() {
  // Dessiner chaque partie
  snake.forEach(dessinerSnakePart);
}

// Dessinez une partie du Snake
function dessinerSnakePart(snakePart) {
  //Définir la couleur de la partie du serpent
  snakeCanvas_ctx.fillStyle = getCouleur();
  // Dessiner un rectangle "rempli" pour représenter la partie du serpent aux coordonnées
  // la partie est située
  snakeCanvas_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Dessiner une bordure autour de la partie du serpent
  snakeCanvas_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function move_snake() {
  // Créer la nouvelle tête du snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  snake.unshift(head);
  if (has_eaten_food) {
    score += 10;
    document.getElementById("score").innerHTML = "Score :" + score;
    // augmenter le score
    gen_food();
  } else {
    // enlever la dernière partie du snake
    snake.pop();
  }
}

function fin_jeu() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const murGauche = snake[0].x < 0;
  const murDroit = snake[0].x > snakeCanvas.width - 10;
  const murHaut = snake[0].y < 0;
  const murBas = snake[0].y > snakeCanvas.height - 10;
  return murGauche || murDroit || murHaut || murBas;
}

function change_direction(event) {
  const TOUCHE_GAUCHE = 37;
  const TOUCHE_DROITE = 39;
  const TOUCHE_HAUT = 38;
  const TOUCHE_BAS = 40;

  // Empêcher le snake de s'inverser

  if (changing_direction) return;
  changing_direction = true;
  const touche = event.keyCode;
  const aller_haut = dy === -10;
  const aller_bas = dy === 10;
  const aller_droite = dx === 10;
  const aller_gauche = dx === -10;
  if (touche === TOUCHE_GAUCHE && !aller_droite) {
    dx = -10;
    dy = 0;
  }
  if (touche === TOUCHE_HAUT && !aller_bas) {
    dx = 0;
    dy = -10;
  }
  if (touche === TOUCHE_DROITE && !aller_gauche) {
    dx = 10;
    dy = 0;
  }
  if (touche === TOUCHE_BAS && !aller_haut) {
    dx = 0;
    dy = 10;
  }
}

function random_food(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function drawFood() {
  snakeCanvas_ctx.fillStyle = "white";
  snakeCanvas_ctx.fillRect(food_x, food_y, 10, 10);
  snakeCanvas_ctx.strokeRect(food_x, food_y, 10, 10);
}
function gen_food() {
  // Génèrer  un random du food x-coordinate
  food_x = random_food(0, snakeCanvas.width - 10);
  // Génèrer  un random du food y-coordinate
  food_y = random_food(0, snakeCanvas.height - 10);
  // ne pas mettre le food dans la meme position que le snake
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

// Fonction pour démarrer le chronomètre
function startTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  document.getElementById("chrono").innerHTML =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);
  timer();
}

// Fonction pour activer le chronomètre
function timer() {
  t = setTimeout(startTimer, 1000);
}
function stopTimer() {
  clearTimeout(t);
}

function resetTimer() {
  document.getElementById("chrono").innerHTML = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
}
