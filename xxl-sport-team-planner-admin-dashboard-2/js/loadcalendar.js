function init() {
    $('.dhx_form_repeat').hide()
    scheduler.plugins({
        recurring: true
    });
    firebase.database().ref('users').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            let trainerlist = []
            console.log(trainerlist)
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const trainer = data[key];
                    trainerlist.push({ key: key, label: trainer.vorname })
                }
            }
            scheduler.i18n.setLocale("de");

            scheduler.config.prevent_cache = true;
            scheduler.config.details_on_create = true;
            scheduler.config.details_on_dblclick = true;
            scheduler.config.occurrence_timestamp_in_utc = true;
            scheduler.config.include_end_by = true;
            scheduler.config.repeat_precise = true;
            scheduler.config.lightbox.sections = [
                { name: "description", height: 50, map_to: "text", type: "textarea", focus: true },
                { name: "Trainer", height: 30, map_to: "trainer", type: "select", options: trainerlist },
                { name: "Info", height: 100, map_to: "info", type: "textarea" },
                { name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", form:"my_recurring_form"},
                { name: "time", height: 72, type: "time", map_to: "auto" }
            ];
            scheduler.config.responsive_lightbox = true;
            scheduler.init('scheduler_here', new Date(), "month");
            document.querySelector(".add_event_button").addEventListener("click", function () {
                scheduler.addEventNow();
            });

            //load courses
            firebase.database().ref('courses').on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    $('#calendar-cours-table').empty();
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const cours = data[key];
                            $('#calendar-cours-table').append('<tr class="selectable-row" id="' + key + '"> <td class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </td> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + cours.name + '</td> </tr>')
                        }
                    }

                    const selected_cours = localStorage.getItem("selected-cours")
                    if (selected_cours === null || selected_cours === 0) {
                        $('#0').click()
                    } else {
                        $('#' + selected_cours).click()
                    }
                }
            });



            $("body").on("click", ".selectable-row", function () {
                const coursidx = $(this).attr("id")
                $("td.is-checkbox-cell > label > input[type=checkbox]").prop('checked', false);
                $("#" + coursidx + " > td.is-checkbox-cell > label > input[type=checkbox]").prop('checked', true);

                //load events from firebase
                firebase.database().ref('courses/' + coursidx + '/events').on('value', (snapshot) => {
                    scheduler.clearAll();
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        console.log(data)

                        for (const key in data) {
                            if (Object.hasOwnProperty.call(data, key)) {
                                const event = data[key];
                                console.log(event)
                                scheduler.parse([event.data], "json");
                            }
                        }
                    }
                });

                //set cookie
                localStorage.setItem("selected-cours", coursidx);
            })

            //on add event
            scheduler.createDataProcessor(function (entity, action, data, id) {
                switch (action) {
                    case "create":
                        firebase.database().ref('courses/' + localStorage.getItem("selected-cours") + '/events').limitToLast(1).once('value').then(function (snapshot) {
                            console.log(data)
                            firebase.database().ref('courses/' + localStorage.getItem("selected-cours") + '/events/' + uuidv4()).set({
                                data
                                /*text: data.text,
                                start_date: data.start_date,
                                end_date: data.end_date,
                                rec_type: data.rec_type, //Todo: nur rec type mit reingeben, wenn es auch angeklickt wurde bzw zerlegen
                                event_length:  data.event_length,
                                trainer: data.trainer,
                                info: data.info,
                                event_pid: data.event_pid,
                                id: data.id,*/
                            });
                        });

                    case "update":

                        break;
                    case "delete":
                        firebase.database().ref('courses/' + localStorage.getItem("selected-cours") + '/events').limitToLast(1).once('value').then(function (snapshot) {

                            let event_num = 0
                            if (snapshot.exists()) {
                                event_num = Object.keys(snapshot.val())[0]
                                console.log(snapshot.val())
                                console.log(event_num)

                            }
                            firebase.database().ref('courses/' + localStorage.getItem("selected-cours") + '/events/' + event_num).set({})
                        })
                        break;
                }
            });
        } else {
            //no trainer avalible
        }

        function uuidv4() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
    });
}