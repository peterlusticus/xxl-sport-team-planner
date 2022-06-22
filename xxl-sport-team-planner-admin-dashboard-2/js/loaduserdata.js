$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user)
            firebase.database().ref('adminuser/'+user.uid).once('value').then(function (snapshot) {
               $("#lblUsername").text(snapshot.val().vorname + " " +snapshot.val().name)
            })        } else {
          // No user is signed in.
        }
      });

})