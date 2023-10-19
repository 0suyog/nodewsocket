// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAUm1zl-6FPawqQo3iaVJeCAhG2QXUr98M",
    authDomain: "tryin-8179b.firebaseapp.com",
    databaseURL: "https://tryin-8179b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tryin-8179b",
    storageBucket: "tryin-8179b.appspot.com",
    messagingSenderId: "94925204679",
    appId: "1:94925204679:web:ba731464cb506ca8e862e2"
  };
  


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = {
  db: db
}
