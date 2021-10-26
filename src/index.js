
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";

//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

function userRegister (user){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, "users/" + user.nombre);

    set(dbRef, user);
}

const id1 = document.getElementById("id1");
const nombre = document.getElementById("nombre");
const registerBtn = document.getElementById("registerBtn");

const id2 = document.getElementById("id2");
const voteBtn = document.getElementById("voteBtn");

const eventRegister = (e, event) =>{
    //Creación del objeto, es lo que le envip al firebase
    console.log("Ingresé aquí");
    const user = {
        id1: id1.value,
        nombre: nombre.value
    }
    userRegister(user);
}


registerBtn.addEventListener("click", eventRegister);
