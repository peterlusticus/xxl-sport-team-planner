$(document).ready(function () {
    firebase.database().ref('users').on('value', (snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val())
            const data = snapshot.val();
            $('#trainer-table').empty();
            for (const key in data) {
                console.log(data[key])
                if (Object.hasOwnProperty.call(data, key)) {
                    const trainer = data[key];
                    $('#trainer-table').append('<tr> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + trainer.vorname + " " + trainer.name + '</td> <td data-label="Sportart">' + trainer.sportart + '</td> <td data-label="Kurse">Bambinos; Jugend B</td> <td data-label="Verhältnis">' + trainer.verhaeltnis + '</td> <td data-label="Gehalt">' + trainer.gehalt + '€/h </td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary" type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal" data-target="sample-modal" type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                }
            }
        }
    });

    $("#btnKursHinzufügen").click(function () {
        console.log(num)
        firebase.database().ref('courses/' + num).set({
            name: $("#tfKursname").val(),
            attendance: $("#tfTeilnehmerzahl").val(),
            age: $("#tfAltersklasse").val()
        });
    })
});