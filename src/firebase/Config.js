import firebase from "firebase";

// firebase config
export var DB_Config = {
  apiKey: "AIzaSyBWo4UKgg0OpTgxLsk-6lwflOP3Cv8MkSA",
  authDomain: "instant-cook.firebaseapp.com",
  databaseURL: "https://instant-cook.firebaseio.com",
  projectId: "instant-cook",
  storageBucket: "instant-cook.appspot.com",
  messagingSenderId: "380459749495",
  appId: "1:380459749495:web:6189895e8e5b2bb6afb672",
};

let app = firebase.initializeApp(DB_Config);

export default app;
