window.onload = function() {
  buildGridOverlay();                      //Génère grid-overlay
  cellCreator(2, 0);
  directions();
  score(0);
};

/* Génère GRID */
function buildGridOverlay() {
  var game    = document.getElementsByClassName('game');  
  var grid    = document.getElementsByClassName('grid');
  var size    = 4;
  var table   = document.createElement('DIV');
  var field = document.getElementById("field")

  table.className += 'grid';
  table.id = ' ';
  table.dataset.value = 0;
  
  for (var i = 0; i < size; i++) {
    var tr = document.createElement('DIV');
    table.appendChild(tr);
    tr.id = 'row_' + (i+1);
    tr.className += 'grid_row';
    
    for (var j = 0; j < size; j++) {
      var td = document.createElement('DIV');
      td.id = '' +(i+1) +(j+1);                            //ID avec x y
      td.className += 'grid_cell';
      tr.appendChild(td);
    }
    field.appendChild(table);
  //document.body.appendChild(table);
  
  }
  
  return table;
}
document.addEventListener('DOMContentLoaded', () => {
  // Définition des durées en secondes pour chaque bouton
  const dureeDifficile = 300; // 5 min
  const dureeIntermediaire = 600; // 10 min
  const dureeFacile = 900; // 15 min

  // Récupération des boutons et du compteur
  const boutonDifficile = document.getElementById('difficile');
  const boutonIntermediaire = document.getElementById('intermediaire');
  const boutonFacile = document.getElementById('facile');
  const compteur = document.getElementById('compteur');
  let intervalle; // Déclaration de l'intervalle en tant que variable globale

  function demarrerCompteARebours(duree) {
    clearInterval(intervalle); // Suppression de l'intervalle actif (s'il existe)
    let tempsRestant = duree;
    intervalle = setInterval(() => {
      const minutes = Math.floor(tempsRestant / 60);
      const secondes = tempsRestant % 60;
      compteur.textContent = `${minutes}:${secondes.toString().padStart(2, '0')}`;
      tempsRestant--;
      if (tempsRestant < 0) {
        clearInterval(intervalle);
        compteur.textContent = 'Terminé !';
      }
    }, 1000);
  }

  // Ajout des écouteurs d'événements aux boutons
  boutonDifficile.addEventListener('click', () => {
    demarrerCompteARebours(dureeDifficile);
  });

  boutonIntermediaire.addEventListener('click', () => {
    demarrerCompteARebours(dureeIntermediaire);
  });

  boutonFacile.addEventListener('click', () => {
    demarrerCompteARebours(dureeFacile);
  });
});


/* CRÉATEUR DE TUILES ALÉATOIRES */
function cellCreator(c, timeOut) {
  /* faire 2 fois pour 2 nouvelles tuiles */
  for (var i = 0; i < c; i++) {
    
    var count = 0;
    /* recherche d'une cellule vide pour créer une tuile */
    
    for (var value = 1; value < 2; value++) {
      var randomX = Math.floor((Math.random()*4)+1);
      var randomY = Math.floor((Math.random()*4)+1);
      var checker = document.getElementById('' +randomX +randomY);
      if (checker.innerHTML != '') {
        value = 0;
      } 
    }
    
    var randomValue = Math.floor((Math.random()*4) +1); //créer la valeur 1, 2, 3 ou 4
    if (randomValue == 3) {randomValue=4};              //3 --> 4
    if (randomValue == 1) {randomValue=2};              //1 --> 2
    var position = document.getElementById(''+randomX +randomY);
    var tile = document.createElement('DIV');           //créer div à x, y
    position.appendChild(tile);                         //la tuile devient l'enfant d'une cellule de la grille
    tile.innerHTML = ''+randomValue;                    //la tuile obtient la valeur 2 ou 4
    
    colorSet(randomValue, tile);
    tile.data = ''+randomValue;
    tile.id = 'tile_'+randomX +randomY;
    position.className += ' active';
    var tileValue = tile.dataset.value;
    tile.dataset.value = ''+randomValue;
    
    console.info(''+timeOut);
    if (timeOut == 0) {
      tile.className = 'tile '+randomValue;
    } else { setTimeout(function() {
        tile.className = 'tile '+randomValue;
      }, 10); }
    
  }
  
  

}

/* DÉPLACER LES TUILES */
document.onkeydown = directions;

function directions(e) {
  e = e || window.event;
  var d = 0;
// ----- KEY UP ----- //
    if (e.keyCode == '38') {      
      var count = 2;  
      
      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, -1, 0, 1, 0);
          console.info(''+x +y);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) { break; }
      }
      cellReset();
    }   
      
// ----- KEY DOWN ----- //
    else if (e.keyCode == '40') { // down
      var count = -2;  
      var test  = 1;
      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, 1, 0, 4, 0);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) { break; }
      }
      cellReset();
    }
      
// ----- KEY LEFT ----- //      
    
    else if (e.keyCode == '37') { // left
      
      
      var count = 2;  
      var test  = 1;
      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, -1, 0, 1);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) { break; }
      }
      cellReset();
    }
  
// ----- KEY RIGHT ----- //
    else if (e.keyCode == '39') { // right
      
      var count = -2;  
      var noCell = 0;
      var c = 1;
      var d = 0;
      
      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, 1, 0, 4, c, d);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) { break; }
      }
      cellReset();
    }

}

//--------------------------------------------------------

function moveTilesMain(x, y, X, Y, xBorder, yBorder, c, d) {      
   
  var tile     = document.getElementById('tile_'+x +y);
  var checker  = document.getElementById(''+x +y);
  var xAround  = x+X;
  var yAround  = y+Y;
  
  if (xAround > 0 && xAround < 5 && yAround > 0 && yAround < 5 && checker.className == 'grid_cell active') {
    var around = document.getElementById(''+xAround +yAround);
    
    //________
      
    if (around.className == 'grid_cell active') {
      //capturer
      var aroundTile = document.getElementById('tile_'+xAround +yAround);
      if (aroundTile.innerHTML == tile.innerHTML) {
        //identique
        var value = tile.dataset.value*2;
        aroundTile.dataset.value = ''+value;
        aroundTile.className = 'tile '+value;
        aroundTile.innerHTML = ''+value;
        colorSet(value, aroundTile);
        checker.removeChild(tile);
        checker.className = 'grid_cell';
        around.className  = 'grid_cell active merged';
        document.getElementsByClassName('grid').id = 'moved';
        document.getElementsByClassName('grid').className = 'grid '+value;
        var grid = document.getElementById(' ');
        var scoreValue = parseInt(grid.dataset.value);
        var newScore = value + scoreValue;
        
        grid.dataset.value = newScore;
        var score = document.getElementById('value');
        
        score.innerHTML = ''+newScore;
      } 
    } else if (around.className == 'grid_cell'){
      //ne pas capturer
      around.appendChild(tile);
      around.className = 'grid_cell active';
      tile.id = 'tile_'+xAround +yAround;
      checker.className = 'grid_cell';
      document.getElementsByClassName('grid').id = 'moved';
    }
    
    
    //________
  }  
}


//-------------------------------------------------------


function cellReset() {
  var count = 0;
  var a = document.getElementsByClassName('grid').id;
  console.log(''+a);
  
  for (var x=1; x<5; x++) {
    for (var y=1; y<5; y++) {
      
      var resetter = document.getElementById(''+x +y);
      if (resetter.innerHTML != '') {
        count++;
      }
      
      if (resetter.innerHTML == '') {
        resetter.className = 'grid_cell';
      } 
      
      if (resetter.className == 'grid_cell active merged') {
        resetter.className = 'grid_cell active'
      }
    }
  }
  if (count == 16) {
    document.getElementById('status').className = 'lose';
  } else if (document.getElementsByClassName('grid').id == 'moved'){ 
    cellCreator(1, 1); 
  }
  document.getElementsByClassName('grid').id = ' ';
}

function score() {
  
  var grid = document.getElementById(' ');
  var value = grid.dataset.value;
  document.getElementById('value').innerHTML = ''+value;
  
}


/* ----- STYLE ----- */
function colorSet(value, tile) {
  switch(value) {
    case 2:    tile.style.background = '#fbfced'; tile.style.color = 'black'; break;
    case 4:    tile.style.background = '#ecefc6'; tile.style.color = 'black'; break;
    case 8:    tile.style.background = '#ffb296'; tile.style.color = 'black'; break;
    case 16:   tile.style.background = '#ff7373'; tile.style.color = 'black'; break;
    case 32:   tile.style.background = '#f6546a'; tile.style.color = 'white'; break;
    case 64:   tile.style.background = '#8b0000'; tile.style.color = 'white'; break;
    case 128:  tile.style.background = '#794044'; tile.style.color = 'white'; 
               tile.style.fontSize = '50px'; break;
    case 256:  tile.style.background = '#31698a'; tile.style.color = 'white';
               tile.style.fontSize = '50px'; break;
    case 512:  tile.style.background = '#297A76'; tile.style.color = 'white';
               tile.style.fontSize = '50px'; break;
    case 1024: tile.style.background = '#2D8A68'; tile.style.color = 'white';
               tile.style.fontSize = '40px'; break;
    case 2048: tile.style.background = '#1C9F4E'; tile.style.color = 'white'; 
               tile.style.fontSize = '40px'; 
               document.getElementById('status').className = 'won'; break;
    case 4096: tile.style.background = '#468499'; tile.style.color = 'white'; 
               tile.style.fontSize = '40px'; break;
    case 8192: tile.style.background = '#0E2F44'; tile.style.color = 'white';
               tile.style.fontSize = '40px'; break;
  }
                    
}

function info() {
  setTimeout(function() {
    document.getElementById('description').classList.toggle('show');
  }, 10);  
  
}

function param() {
  setTimeout(function() {
    document.getElementById('niveau').classList.toggle('show');
    document.getElementById("fermer").style.display = "block";
  }, 10);  
  
}
function param1() {
  setTimeout(function() {
    document.getElementById('niveau').classList.toggle('show');
    document.getElementById("fermer").style.display = "none";
  }, 10);  
  
}

function reset() {
  for (var x = 1; x < 5; x++) {
    for (var y = 1; y < 5; y++) {
      var resetter = document.getElementById(''+x +y);
      if (resetter.className == 'grid_cell active') {
        var tile = document.getElementById('tile_'+x +y);
        resetter.removeChild(tile);
      }
    }
  }
  document.getElementById('status').className = '';
  document.getElementById(' ').dataset.value = 0;
  score();
  cellReset();
  cellCreator(2, 0);
}