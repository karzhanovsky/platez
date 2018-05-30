import * as firebase from 'firebase';

const config = {
    apiKey: "*",
    authDomain: "tablice-4fce5.firebaseapp.com",
    databaseURL: "https://tablice-4fce5.firebaseio.com",
    projectId: "tablice-4fce5",
    storageBucket: "tablice-4fce5.appspot.com",
    messagingSenderId: "1002406223736"
  };
  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();

  const db = firebase.database();

  export {
    auth,
    db,
    firebase,
  };
