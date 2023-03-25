

let user = localStorage.getItem("recordFruit");
let data = JSON.parse(user);
console.log(data);

const tableau = document.getElementById('mon-tableau');
const nouvelleLigne = tableau.insertRow();
const colonne1 = nouvelleLigne.insertCell();
const colonne2 = nouvelleLigne.insertCell();
const colonne3 = nouvelleLigne.insertCell();
const colonne4 = nouvelleLigne.insertCell();
const colonne5 = nouvelleLigne.insertCell();
colonne1.innerHTML = data.date;
colonne2.innerHTML = data.id;
colonne3.innerHTML = data.niveau;
colonne4.innerHTML = data.score2;
colonne5.innerHTML = data.temps;
