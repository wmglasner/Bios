import * as firebase from "firebase";
export const firebaseConfig = {
    apiKey: "AIzaSyBJGeAveZcG4h8P4DQspISRNHGdb-AQxnU",
    authDomain: "biosrn-400e0.firebaseapp.com",
    databaseURL: "https://biosrn-400e0.firebaseio.com",
    projectId: "biosrn-400e0",
    storageBucket: "biosrn-400e0.appspot.com",
    messagingSenderId: "1039131454423",
    appId: "1:1039131454423:web:3255fdf4373e0c93a7b992"
  };
  // Initialize Firebase
  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
