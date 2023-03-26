document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  let score = 0;
  let niveauFruit;
  const FruitCanvas = document.getElementById("FruitCanvas");
  // un contexte de dessin en deux dimensions
  const FruitCanvas_ctx = FruitCanvas.getContext("2d");
  var candyColors = [
    "url(/FruitCrush/assets/banane.png)",
    "url(/FruitCrush/assets/ananas.png)",
    "url(/FruitCrush/assets/framboise.png)",
    "url(/FruitCrush/assets/dragon.png)",
    "url(/FruitCrush/assets/pomme.png)",
    "url(/FruitCrush/assets/pasteque.png)",
    "url(/FruitCrush/assets/cerise.png)",
    "url(/FruitCrush/assets/avocat.png)",
    "url(/FruitCrush/assets/raisins.png)",
    "url(/FruitCrush/assets/coco.png)",
    "url(/FruitCrush/assets/prune.png)",
  ];

  function getNiveau() {
    var select = document.getElementById("niveau");
    var niveau = select.options[select.selectedIndex].value;
    if (niveau == "150") {
      this.candyColors = [
        "url(/FruitCrush/assets/banane.png)",
        "url(/FruitCrush/assets/ananas.png)",
        "url(/FruitCrush/assets/framboise.png)",
        "url(/FruitCrush/assets/dragon.png)",
        "url(/FruitCrush/assets/pomme.png)",
        "url(/FruitCrush/assets/pasteque.png)",
        "url(/FruitCrush/assets/cerise.png)",
        "url(/FruitCrush/assets/avocat.png)",
      ];
      niveauFruit = "Facile";
    } else if (niveau == "100") {
      this.candyColors = [
        "url(/FruitCrush/assets/banane.png)",
        "url(/FruitCrush/assets/ananas.png)",
        "url(/FruitCrush/assets/framboise.png)",
        "url(/FruitCrush/assets/dragon.png)",
        "url(/FruitCrush/assets/pomme.png)",
        "url(/FruitCrush/assets/pasteque.png)",
        "url(/FruitCrush/assets/cerise.png)",
        "url(/FruitCrush/assets/avocat.png)",
        "url(/FruitCrush/assets/raisins.png)",
        "url(/FruitCrush/assets/coco.png)",
      ];
      niveauFruit = "Moyen";
    } else {
      this.candyColors = [
        "url(/FruitCrush/assets/banane.png)",
        "url(/FruitCrush/assets/ananas.png)",
        "url(/FruitCrush/assets/framboise.png)",
        "url(/FruitCrush/assets/dragon.png)",
        "url(/FruitCrush/assets/pomme.png)",
        "url(/FruitCrush/assets/pasteque.png)",
        "url(/FruitCrush/assets/cerise.png)",
        "url(/FruitCrush/assets/avocat.png)",
        "url(/FruitCrush/assets/raisins.png)",
        "url(/FruitCrush/assets/coco.png)",
        "url(/FruitCrush/assets/prune.png)",
        "url(/FruitCrush/assets/olive.png)",
      ];
      niveauFruit = "Difficle";
    }
    //alert("Niveau sélectionné : " + niveau);
    return this.candyColors;
  }
  console.log(candyColors);

  //création du board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * getNiveau().length);
      square.style.backgroundImage = getNiveau()[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();
  // Dragger les fruits
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    console.log("dragStart");
    // this.style.backgroundImage = ''
  }

  function dragOver(e) {
    e.preventDefault();
    console.log("dragOver");
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log("dragEnter");
  }

  function dragLeave() {
    this.style.backgroundImage = "";
    console.log("dragLeave");
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    console.log("dragDrop");
    console.log(squareIdBeingReplaced);
  }

  function dragEnd() {
    //est ce un mouvement valide?
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    console.log(validMoves);

    console.log("dragEnd");
  }

  //faire tomber les fruits une fois les squares sont vides
  function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * getNiveau().length);
          squares[i].style.backgroundImage = getNiveau()[randomColor];
        }
      }
    }
  } ///Checker les matches
  //pour la rangée de quatre
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = "Score :" + score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForFour();

  //pour les colonnes de quatre
  function checkColumnForFour() {
    for (i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = "Score :" + score;
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForFour();

  //pour la rangée de trois
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];

      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = "Score :" + score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForThree();

  //pour les colonnes de trois
  function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = "Score :" + score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkColumnForThree();

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

  //Avant de commencer le jeu
  function DebutCanvas() {
    FruitCanvas_ctx.fillStyle = "Orange";
    //  Sélectionnez la couleur de la bordure du Canvas
    FruitCanvas_ctx.strokestyle = "Black";
    // dessiner un rectangle "rempli"
    FruitCanvas_ctx.font = "30px Arial";
    // dessiner la bordure
    FruitCanvas_ctx.fillText("Cliquer sur espace pour commencer", 60, 300);
  }

  //Fin du jeu
  function FinCanvas() {
    FruitCanvas_ctx.fillStyle = "Orange";
    //  Sélectionnez la couleur de la bordure du Canvas
    FruitCanvas_ctx.strokestyle = "Black";
    // dessiner un rectangle "rempli"
    FruitCanvas_ctx.font = "30px Arial";
    // dessiner la bordure
    FruitCanvas_ctx.clearRect(0, 0, FruitCanvas.width, FruitCanvas.height);
  }

  //button Paramètre
  document.getElementById("myButton").addEventListener("click", function () {
    console.log(getNiveau());

    document.getElementById("score").style.display = "none";
    document.getElementById("chrono").style.display = "none";
    document.getElementById("myForm").style.display = "block";
    FinCanvas();
    document.getElementById("FruitCanvas").style.display = "block";

    document.getElementById("score").innerHTML = "";
    document.getElementById("myButtonReprendre").style.display = "block";
  });

  //button record
  document.getElementById("myButtonRecord").addEventListener("click", function () {
      debugger;

      let nom = localStorage.getItem("id");
      let data = JSON.parse(nom);
      console.log(data);

      const date = new Date();
      const jour = date.getDate().toString().padStart(2, "0");
      const mois = (date.getMonth() + 1).toString().padStart(2, "0");
      const annee = date.getFullYear();
      console.log(`${jour}/${mois}/${annee}`);

      let user = {
        id: data.id,
        score2: score,
        date: `${jour}/${mois}/${annee}`,
        niveau: niveauFruit,
        temps: document.getElementById("chrono").innerHTML,
      };
      let json = JSON.stringify(user);
      localStorage.setItem("recordFruit", json);
      console.log("record ajouté");
      console.log(json);

      document.getElementById("score").innerHTML = "";
      window.location.href = "recordFruitCrush.html";
    });

  DebutCanvas();
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      document.getElementById("FruitCanvas").style.display = "none";
      document.getElementById("score").style.display = "block";
      document.getElementById("chrono").style.display = "block";
      // document.getElementById("FruitGrid").style.display = "block";

      timer();
    }
  });


  //button rejouer
  document.getElementById("myButtonReprendre").addEventListener("click", function () {
      score = 0;
      document.getElementById("score").style.display = "block";
      document.getElementById("chrono").style.display = "none";
      document.getElementById("myForm").style.display = "none";
      document.getElementById("FruitCanvas").style.display = "none";
      document.getElementById("score").innerHTML = "Score :";
      document.getElementById("myButtonReprendre").style.display = "none";

      DebutCanvas();
      document.getElementById("FruitCanvas").style.display = "block";
      document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
          document.getElementById("FruitCanvas").style.display = "none";
          document.getElementById("score").style.display = "block";
          document.getElementById("chrono").style.display = "block";
          // document.getElementById("FruitGrid").style.display = "block";
        }
      });
    });

  //La fonction est utilisée pour appeler les fonctions spécifiées de manière répétée à intervalles de temps réguliers.
  window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
  }, 200);
});
