$(document).ready(function () {
    let num = undefined
    firebase.database().ref('courses').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            $('#cours-table-klettern').empty();
            $('#cours-table-bouldern').empty();
            //for (let i = 0; i < data.length; i++) {
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const cours = data[key];
                    if (cours.sportart == "Klettern") {
                        $('#cours-table-klettern').append('<tr> <td class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </td> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + cours.name + '</td> <td data-label="Teilnehmerzahl">' + cours.attendance + '</td> <td data-label="Altersklasse">' + cours.age + '</td> <td data-label="Erstellt_am">' + cours.datum + '</td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary btn-edit" id=' + key + ' type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal btn-delete" data-target="modal-delete-cours" id=' + key + ' type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                    } else {
                        $('#cours-table-bouldern').append('<tr> <td class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </td> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + cours.name + '</td> <td data-label="Teilnehmerzahl">' + cours.attendance + '</td> <td data-label="Altersklasse">' + cours.age + '</td> <td data-label="Erstellt_am">' + cours.datum + '</td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary btn-edit" id=' + key + ' type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal btn-delete" data-target="modal-delete-cours" id=' + key + ' type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                    }
                }
            }
        } else {
            num = 0
        }
    });

    $('body').on('click', '.btn-edit', function () {
        const id = $(this).attr('id')
        firebase.database().ref('courses/' + id).once('value').then(function (snapshot) {
            console.log(snapshot.val())
            $("#tfKursname").val(snapshot.val().name)
            $("#tfAltersklasse").val(snapshot.val().age)
            $("#tfTeilnehmerzahl").val(snapshot.val().attendance)

            $('#btnSave').click(function () {
                console.log(id)
                firebase.database().ref('courses/' + id).update({
                    name: $("#tfKursname").val(),
                    age: $("#tfAltersklasse").val(),
                    attendance: $("#tfTeilnehmerzahl").val(),
                });
            })

        })
        $('#modal-edit-cours').addClass('is-active');

    })

    $('body').on('click', '.btn-delete', function () {
        const id = $(this).attr('id');
        $('#btnDelete').click(function () {
            firebase.database().ref('courses/' + id).set({});
        })
        $('#modal-delete-cours').addClass('is-active');

    })

    $("#btnKursHinzufügenKlettern").click(function () {
        const d = new Date()
        const datum = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
        firebase.database().ref('courses/' + uuidv4()).set({
            name: $("#tfKursnameKlettern").val(),
            attendance: $("#tfTeilnehmerzahlKlettern").val(),
            age: $("#tfAltersklasseKlettern").val(),
            sportart: "Klettern",
            datum: datum
        });
    })

    $("#btnKursHinzufügenBouldern").click(function () {
        const d = new Date()
        const datum = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
        firebase.database().ref('courses/' + uuidv4()).set({
            name: $("#tfKursnameBouldern").val(),
            attendance: $("#tfTeilnehmerzahlBouldern").val(),
            age: $("#tfAltersklasseBouldern").val(),
            sportart: "Bouldern",
            datum: datum
        });
    })

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
});