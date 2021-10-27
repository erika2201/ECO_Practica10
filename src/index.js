
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";


//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

//Metodo registrar usuario
function userRegister (user){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, 'users/' + user.nombre);

    set(dbRef, user);
}

//Metodo para lista de candidatos
function getUsers(){
    const db = getDatabase();
    const dbRef = ref(db, 'users');

    //Leer (algo parecido a un observer)
    onValue(dbRef, (snapshot)=>{
        const data = snapshot.val();
        console.log(data);
        currentList(data);
    });
}


function currentList(info){
    let text = "";
    //Me da el arreglo de las llaves de un objeto
    Object.keys(info).forEach((k,index)=>{
        console.log(k, index);
        text += "ID:" +info[k].id1+ " Nombre: " +info[k].nombre + "\n";
    });
    alert(text);
}




//Instancias de los objetos
const id1 = document.getElementById("id1");
const nombre = document.getElementById("nombre");
const registerBtn = document.getElementById("registerBtn");

const id2 = document.getElementById("id2");
const voteBtn = document.getElementById("voteBtn");

const candListBtn = document.getElementById("candListBtn");
const voteListBtn = document.getElementById("voteListBtn");


//Metodo creación del usuario como un objeto
const eventRegister = (e, event) =>{
    //Creación del objeto, es lo que le envip al firebase
    console.log("Ingresé aquí");
    const user = {
        id1: id1.value,
        nombre: nombre.value
    }
    userRegister(user);
}


//Clicks
registerBtn.addEventListener('click', eventRegister);
candListBtn.addEventListener('click', getUsers);


