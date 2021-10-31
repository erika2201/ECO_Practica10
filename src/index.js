
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, get, push} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";


//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);


//REGISTRAR CANDIDATOS
//Metodo registrar candidato
function candRegister (candidate){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, 'candidates/' + candidate.id1);
    
    get(dbRef).then ((snapshot) => {
        const data = snapshot.val();
        //Si no ha sido registrado
       if(data===null){
            //Entonces registra
        set(dbRef, candidate);
       }else{
           //sino, avisa que ya está registrado
        alert("El ID ya ha sido registrado");
       }
      });
}


//Metodo para lista de candidatos
function getCand(){
    const db = getDatabase();
    const dbRef = ref(db, 'candidates');

    get(dbRef).then((snapshot)=>{
        const data = snapshot.val();
        //Si la lista está vacia
        if(data===null){
            //Avisa que está vacia
            alert("No hay candidatos registrados");    
        }else{
            //Sino, muestre la lista
            currentList(data);
        }
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
    const dbRef = push(ref(db, 'votes'));
    const candRef = ref(db, 'candidates/' + vote.id2);

    get(candRef).then ((snapshot) => {
        const data = snapshot.val();
       //Si vota por uno que no exista 
       if(data===null){
           //Avisele que no existe
        alert("El ID no pertenece a algún candidato");
       }else{
           //Sino, guarde el voto
        set(dbRef, vote);
       }
      });
}

//Instancias de los objetos
const id1 = document.getElementById("id1");
const nombre = document.getElementById("nombre");
const registerBtn = document.getElementById("registerBtn");

const id2 = document.getElementById("id2");
const voteBtn = document.getElementById("voteBtn");

const candListBtn = document.getElementById("candListBtn");
const voteListBtn = document.getElementById("voteListBtn");


//Metodo creación del candidato como un objeto
const eventRegister = (e, event) =>{
    //Si los campos tienen algo
    if(id1.value!=""||nombre.value!=""){
        //Cree el objeto, es lo que le envip al firebase
        const candidate = {
            id1: id1.value,
            nombre: nombre.value
        }
        candRegister(candidate);
        id1.value='';
        nombre.value='';
    }else{
        //Sino avise que debe llenar los campos
        alert("Ingresa todos los campos");
    }
}

//Metodo creación del voto como un objeto
const eventVote = (e, event) =>{
    if(id2.value!=''){
        //Creación del objeto, es lo que le envip al firebase
        const vote = {   
            id2: id2.value,
        }
        voteRegister(vote);
        id2.value='';
    }else{
        alert("Ingrese un ID para votar"); 
    }
}


//Clicks
registerBtn.addEventListener('click', eventRegister);
voteBtn.addEventListener('click',eventVote);
candListBtn.addEventListener('click', getCand);
//voteListBtn.addEventListener('click', getVotes);



