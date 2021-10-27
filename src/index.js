
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";


//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);


//REGISTRAR CANDIDATOS
//Metodo registrar usuario
function candRegister (candidate){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, 'candidates/' + candidate.nombre);

    set(dbRef, candidate);
}


//Metodo para lista de candidatos
function getCand(){
    const db = getDatabase();
    const dbRef = ref(db, 'candidates');

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
        text += "ID:" +info[k].id1+ "   Nombre: " +info[k].nombre + "\n";
    });
    alert(text);
}


//REGISTRAR VOTOS>>VOTAR XD
//Metodo registrar votos
function voteRegister (vote){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, 'votes/' + vote.id2);

    set(dbRef, vote);
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
    const candidate = {
        id1: id1.value,
        nombre: nombre.value
    }
    candRegister(candidate);
}

//Metodo creación del voto como un objeto
const eventVote = (e, event) =>{
    //Creación del objeto, es lo que le envip al firebase
    const vote = {
        id2: id2.value,
    }
    voteRegister(vote);
}


//Clicks
registerBtn.addEventListener('click', eventRegister);
voteBtn.addEventListener('click',eventVote);
candListBtn.addEventListener('click', getCand);
//voteListBtn.addEventListener('click', verVotaciones);



