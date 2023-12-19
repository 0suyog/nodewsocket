// Import the functions you need from the SDKs you need
var admin = require("firebase-admin");
var private_key = require("./gottabesafe.json");
// const { initializeApp } = require("firebase-admin/app");
// const { getDatabase } = require("firebase-admin/database");

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  credential: admin.credential.cert(private_key),
  databaseURL:
    "https://tryin-8179b-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);
const db = admin.database();

// const refer =fb.database().ref();

module.exports = {
  db: db,
};
