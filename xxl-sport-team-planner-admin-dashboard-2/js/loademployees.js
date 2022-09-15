$(document).ready(function () {


    firebase.database().ref('users').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            $('#trainer-table').empty();
            for (const trainerkey in data) {
                if (Object.hasOwnProperty.call(data, trainerkey)) {
                    const trainer = data[trainerkey];
                    //get courses by searching events
                    firebase.database().ref('courses').once('value').then(function (snapshot) {
                        let coursstring = ""
                        for (const courskey in snapshot.val()) {
                            if (Object.hasOwnProperty.call(snapshot.val(), courskey)) {
                                const cours = snapshot.val()[courskey];
                                if (Object.hasOwnProperty.call(cours, 'events')) {
                                    for (const key in cours['events']) {
                                        if (Object.hasOwnProperty.call(cours['events'], key)) {
                                            const event = cours['events'][key];
                                            if (event['trainer'] === trainerkey) {
                                                console.log("heey")
                                                if (!coursstring.includes(cours['name'])) {
                                                    let comma = ""
                                                    if (coursstring !== "") {
                                                        comma = ", "
                                                    }
                                                    coursstring = coursstring + comma + cours['name']
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        $('#trainer-table').append('<tr> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + trainer.vorname + " " + trainer.nachname + '</td> <td data-label="Kurse">' + coursstring + '</td> <td data-label="Verhältnis">' + trainer.verhaeltnis + '</td> <td data-label="Gehalt">' + trainer.gehalt + '€/h </td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary jb-modal btn-edit" id=' + trainerkey + ' data-target="modal-edit-employee" type="button"> <span class="icon"> <i class="mdi mdi-eye"></i> </span> </button> <button class="button is-small is-danger jb-modal btn-delete" id=' + trainerkey + ' data-target="modal-delete-employee" type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                    })

                }
            }
        } else {
            $("#trainer-table-wrapper").remove();
        }
    });
    $('body').on('click', '.btn-edit', function () {
        const id = $(this).attr('id')
        firebase.database().ref('users/' + id).once('value').then(function (snapshot) {
            $("#tfName").val(snapshot.val().nachname)
            $("#tfVorname").val(snapshot.val().vorname)
            $("#tfGehalt").val(snapshot.val().gehalt)
            $("#tfVerhaeltnis").val(snapshot.val().verhaeltnis)

            $('#btnSave').click(function () {
                firebase.database().ref('users/' + id).set({
                    nachname: $("#tfName").val(),
                    vorname: $("#tfVorname").val(),
                    gehalt: $("#tfGehalt").val(),
                    verhaeltnis: $("#tfVerhaeltnis").val(),
                });
            })

        })
        $('#modal-edit-employee').addClass('is-active');

    })

    $('body').on('click', '.btn-delete', function () {
        const id = $(this).attr('id');
        $('#btnDelete').click(function () {
            firebase.database().ref('users/' + id).set({});
            firebase.auth().deleteUser(id)
                .then(() => {
                    console.log('Successfully deleted user');
                })
                .catch((error) => {
                    console.log('Error deleting user:', error);
                });
            //delete firebase auth from user (only server sided with firebase admin sdk)
        })
        $('#modal-delete-employee').addClass('is-active');

    })

    //Todo: login for other employees
    firebase.database().ref('otheruser').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            $('#employees-table').empty();
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const employee = data[key];
                    $('#employees-table').append('<tr> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + employee.vorname + " " + employee.nachname + '</td> <td data-label="Bereich">' + employee.bereich + '</td> <td data-label="Verhältnis">' + employee.verhaeltnis + '</td> <td data-label="Gehalt">' + employee.gehalt + '€/h </td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary" type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal" data-target="sample-modal" type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                }
            }
        } else {
            $("#employee-table-wrapper").remove();
        }
    });

    $("#btnKursHinzufügen").click(function () {
        firebase.database().ref('courses/' + num).set({
            name: $("#tfKursname").val(),
            attendance: $("#tfTeilnehmerzahl").val(),
            age: $("#tfAltersklasse").val()
        });
    })
});