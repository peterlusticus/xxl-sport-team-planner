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
                        window.location.href = "home.html"
                    }
                }
            });
        }
    })

})