import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCkSEkbZIY6OPSYkHwIgrnDGk-pzuzNiVY",
  authDomain: "kashapov-todoist.firebaseapp.com",
  databaseURL: "https://kashapov-todoist.firebaseio.com",
  projectId: "kashapov-todoist",
  storageBucket: "kashapov-todoist.appspot.com",
  messagingSenderId: "583185810991",
  appId: "1:583185810991:web:8aaa0865c8130c19"
});

export { firebaseConfig as firebase };
