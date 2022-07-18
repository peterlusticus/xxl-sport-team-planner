$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user)
      firebase.database().ref('adminuser/' + user.uid).on('value', (snapshot) => {
        if (snapshot.exists()) {
          $("#tfName").val(snapshot.val().name)
          $("#tfVorname").val(snapshot.val().vorname)
          $("#tfMail").val(user.email)

          $("#lblName").val(snapshot.val().vorname + " " + snapshot.val().name)
          $("#lblMail").val(user.email)
        }
      })
    } else {
      // No user is signed in.
    }
  });

  $("#btnSaveProfile").on('click', function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase.database().ref('adminuser/' + user.uid).set({
          name: $("#tfName").val(),
          vorname: $("#tfVorname").val(),
        });
      }
    })
  })
})