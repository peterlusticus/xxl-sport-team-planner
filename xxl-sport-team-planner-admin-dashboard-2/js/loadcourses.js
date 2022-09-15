$(document).ready(function () {
    firebase.database().ref('categorys').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            $('#table-section').empty();
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const sportart = data[key];
                    $('#table-section').append('<div class="card has-table"> <header class="card-header"> <p class="card-header-title"> <span class="icon"><i class="mdi mdi-account-multiple"></i></span> ' + sportart.name + ' </p> <a class="card-header-icon" id="btnDeleteCategory" data-category-id="' + key + '"> <span class="icon"><i class="mdi mdi-delete"></i></span> </a> </header> <div class="card-content"> <div class="b-table has-pagination"> <div class="table-wrapper has-mobile-cards"> <table class="table is-fullwidth is-striped is-hoverable is-fullwidth"> <thead> <tr> <th class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </th> <th></th> <th>Name</th> <th>Teilnehmerzahl</th> <th>Altersklasse</th> <th>Erstellt am</th> <th></th> </tr> </thead> <tbody class="tablecontent" id="cours-table-' + key + '"> </tbody> </table> <div style="padding:0px 12px 12px 12px"> <button id="btnAddCours" data-category-id="' + key + '" data-target="modal-add-cours" style="width: 100%;" type="button" class="button jb-modal">Kurs hinzufügen</button> </div> </div> </div> </div> </div>')
                }
            }
        }
    });

    firebase.database().ref('courses').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            $('.tablecontent').empty();
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const cours = data[key];
                    $('#cours-table-' + cours.sportart + '').append('<tr> <td class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </td> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + cours.name + '</td> <td data-label="Teilnehmerzahl">' + cours.attendance + '</td> <td data-label="Altersklasse">' + cours.age + '</td> <td data-label="Erstellt_am">' + cours.datum + '</td> <td class="is-actions-cell"> <div class="buttons is-right"> <button class="button is-small is-primary btn-edit" id=' + key + ' type="button"> <span class="icon"><i class="mdi mdi-eye"></i></span> </button> <button class="button is-small is-danger jb-modal btn-delete" data-target="modal-delete-cours" id=' + key + ' type="button"> <span class="icon"><i class="mdi mdi-trash-can"></i></span> </button> </div> </td> </tr>')
                }
            }
        }
    });

    //modal funktioniert nicht bei dynamisch hinzugefügten buttons...deshalb der scheiss:
    $('body').on('click', '#btnAddCours', function () {
        $("#modal-add-cours").show();
        const id = $(this).attr('data-category-id')
        $("#btnKursHinzufügen").attr('data-category-id', id);

    })
    $('body').on('click', '.closee', function () {
        $("#modal-add-cours").hide();
    })


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

    $("#btnKursHinzufügen").click(function () {
        const d = new Date()
        //Todo month
        const month = d.getMonth() + 1
        const datum = d.getDate() + "." + month + "." + d.getFullYear();
        firebase.database().ref('courses/' + uuidv4()).set({
            name: $("#tfKursnameKlettern").val(),
            attendance: $("#tfTeilnehmerzahlKlettern").val(),
            age: $("#tfAltersklasseKlettern").val(),
            sportart: $(this).attr('data-category-id'),
            datum: datum,
        });
    })

    $("#btnAddCategory").click(function () {
        firebase.database().ref('categorys/' + uuidv4()).set({
            name: $("#tfNameSportart").val(),
        });
    })

    $('body').on('click', '#btnDeleteCategory', function () {
        const categoryId =$(this).attr('data-category-id')

        firebase.database().ref('courses/').once('value').then(function (snapshot) {
            const data = snapshot.val();
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const cours = data[key];
                    console.log(cours.sportart)
                    if (cours.sportart == categoryId) {
                        console.log("ddd")
                        firebase.database().ref('courses/' + key).set({});
                    }
                }
            }
            firebase.database().ref('categorys/' + categoryId).set({});
            location.reload();
        })
    })

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
});