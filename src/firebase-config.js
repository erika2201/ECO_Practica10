const firebaseConfig = {
    apiKey: "AIzaSyBNdInIVIx_kWlRYPKyB5ejmWgt8Yg5xh8",
    authDomain: "eco-semana10.firebaseapp.com",
    databaseURL: "https://eco-semana10-default-rtdb.firebaseio.com",
    projectId: "eco-semana10",
    storageBucket: "eco-semana10.appspot.com",
    messagingSenderId: "566555960462",
    appId: "1:566555960462:web:0eaf50e6f17660f6ab15df"
  };

  export function getFirebaseConfig(){
    if(!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    }else{
        return firebaseConfig;
    }
  }