$(document).ready(function () {
  /* Logout button */
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBglnXCOAu9oq-aBSAtNwxjyJangzxkA0k",
    authDomain: "fir-scheduler-4266d.firebaseapp.com",
    databaseURL: "https://fir-scheduler-4266d-default-rtdb.firebaseio.com",
    projectId: "fir-scheduler-4266d",
    storageBucket: "fir-scheduler-4266d.appspot.com",
    messagingSenderId: "168776683929",
    appId: "1:168776683929:web:41ac7e9c44305fc8754308",
    measurementId: "G-K9CQVBJV8H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

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