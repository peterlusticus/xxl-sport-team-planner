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
    const auth = firebase.auth();

    //signIN function
    $("#btnLogin").click(function () {
        const mail = $("#tfEmail").val();
        const password = $("#tfPasswort").val()
        const promise = auth.signInWithEmailAndPassword(mail, password);
        promise.catch(e => {
            $("#errordiv").append('<div class="notification" style="margin-bottom: 25px; background: lightcoral; padding: 1rem 1rem 1rem 1rem;"> <div class="level"> <div> <p>' + e.message + '</p> </div> </div> </div>')
        });
    })

    //Signup
    $("#btnRegister").click(function () {
        const mail = $("#tfEmail").val();
        const password = $("#tfPasswort").val()

        const promise = auth.createUserWithEmailAndPassword(mail, password).then((val) => {
            console.log(val.user.uid)
            const name = $("#tfName").val();
            const vorname = $("#tfVorname").val()
            firebase.database().ref('adminuser/' + val.user.uid).set({
                name: name,
                vorname: vorname
            });
        });
        promise.catch(e => {
            $("#errordiv").append('<div class="notification" style="margin-bottom: 25px; background: lightcoral; padding: 1rem 1rem 1rem 1rem;"> <div class="level"> <div> <p>' + e.message + '</p> </div> </div> </div>')
        });
    })

    //Logout
    $("#btnAbmelden").click(function () {
        auth.signOut();
    })

    //active user to homepage
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref('adminuser/').once('value').then(function (snapshot) {
                if (snapshot.exists()) {
                    if (Object(snapshot.val()).hasOwnProperty(user.uid)) {
                        window.location.href = "courses.html"
                    }
                }
            });
        }
    })

})