  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCI9NyA5fWdGdu7QtBpWBoZQqwje9C2LD4",
    authDomain: "xxl-sport-dresden.firebaseapp.com",
    databaseURL: "https://xxl-sport-dresden-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "xxl-sport-dresden",
    storageBucket: "xxl-sport-dresden.appspot.com",
    messagingSenderId: "1093629871818",
    appId: "1:1093629871818:web:d5aff76d8050dfb5805633",
    measurementId: "G-D77VJ6FQJ7"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
$(document).ready(function () {
  /* Logout button */
  const auth = firebase.auth();
  $("#btnAbmelden").click(function () {
    auth.signOut();
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {

    } else {
      window.location.href = "index.html"
    }
  })
})