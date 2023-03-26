window.onload = init;

function init(){

    
   
    


const form = document.querySelector('form');
let id = document.getElementById('id');
let mdp = document.getElementById('mdp');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (id.value=== "" ||mdp.value === ""){
        alert("Veuillez remplir les champs nécessaires !");
    }else{
        console.log(id.value); 
        let user ={
            id: id.value,
            mdp: mdp.value
        
        };
        let json = JSON.stringify(user);
        let identifiant = id.value;
        localStorage.setItem("id", json);
        console.log("user ajouté");
    console.log(mdp.value);
    console.log(json)
    window.location.assign("acceuil/acceuil.html");
    }
});

}

 
