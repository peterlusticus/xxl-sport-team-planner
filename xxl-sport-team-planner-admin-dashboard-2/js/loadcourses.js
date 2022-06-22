$(document).ready(function () {
    let num = undefined
    firebase.database().ref('courses').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            num = data.length
            $('#cours-table-klettern').empty();
            $('#cours-table-bouldern').empty();
            for (let i = 0; i < data.length; i++) {
                const cours = data[i];
                if (cours.sportart == "Klettern") {
                    $('#cours-table-klettern').append('<tr> <td class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </td> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + cours.name + '</td> <td data-label="Teilnehmerzahl">' + cours.attendance + '</td> <td data-label="Altersklasse">' + cours.age + '</td> <td data-label="Erstellt_am">30. Juni 2022</td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary" type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal" data-target="modal-delete" type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                } else {
                    $('#cours-table-bouldern').append('<tr> <td class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </td> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + cours.name + '</td> <td data-label="Teilnehmerzahl">' + cours.attendance + '</td> <td data-label="Altersklasse">' + cours.age + '</td> <td data-label="Erstellt_am">30. Juni 2022</td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary" type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal" data-target="modal-delete" type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                }
            }
        } else {
            num = 0
        }
    });

    $("#btnKursHinzufügenKlettern").click(function () {
        firebase.database().ref('courses/' + num).set({
            name: $("#tfKursnameKlettern").val(),
            attendance: $("#tfTeilnehmerzahlKlettern").val(),
            age: $("#tfAltersklasseKlettern").val(),
            sportart: "Klettern"
        });
    })

    $("#btnKursHinzufügenBouldern").click(function () {
        firebase.database().ref('courses/' + num).set({
            name: $("#tfKursnameBouldern").val(),
            attendance: $("#tfTeilnehmerzahlBouldern").val(),
            age: $("#tfAltersklasseBouldern").val(),
            sportart: "Bouldern"
        });
    })
});