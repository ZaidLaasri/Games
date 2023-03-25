let p = document.getElementById('profil');

let user = localStorage.getItem("id");
let data = JSON.parse(user);
console.log(data);

p.innerHTML="Ravi de vous retrouver "+ data.id+" !";