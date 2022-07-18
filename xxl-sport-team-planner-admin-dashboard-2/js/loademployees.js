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
                                for (let i = 0; i < cours['events'].length; i++) {
                                    const event = cours['events'][i];
                                    if (event['trainer'] === trainerkey ) {
                                        let comma = ""
                                        if(coursstring !== ""){
                                            comma = ", "
                                        }
                                        coursstring = coursstring + comma + cours['name']
                                    }
                                }
                            }
                        }
                        $('#trainer-table').append('<tr> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + trainer.vorname + " " + trainer.nachname + '</td> <td data-label="Kurse">'+coursstring+'</td> <td data-label="Verhältnis">' + trainer.verhaeltnis + '</td> <td data-label="Gehalt">' + trainer.gehalt + '€/h </td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary jb-modal btn-edit" id='+trainerkey+' data-target="modal-edit-employee" type="button"> <span class="icon"> <i class="mdi mdi-eye"></i> </span> </button> <button class="button is-small is-danger jb-modal" data-target="sample-modal" type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                    })
                    
                }
            }
        }else{
            $("#trainer-table-wrapper").remove();
        }
    });

    //Todo: login for other employees
    firebase.database().ref('otheruser').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            $('#employees-table').empty();
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const employee = data[key];
                    $('#employees-table').append('<tr> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + employee.vorname + " " + employee.name + '</td> <td data-label="Bereich">' + employee.bereich + '</td> <td data-label="Verhältnis">' + employee.verhaeltnis + '</td> <td data-label="Gehalt">' + employee.gehalt + '€/h </td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary" type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal" data-target="sample-modal" type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                }
            }
        } else{
            $("#employee-table-wrapper").remove();
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