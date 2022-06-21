scheduler.i18n.setLocale("de");
function init() {
    scheduler.plugins({
        recurring: true,
    });
    scheduler.config.prevent_cache = true;

    scheduler.config.details_on_create = true;
    scheduler.config.details_on_dblclick = true;
    scheduler.config.occurrence_timestamp_in_utc = true;
    scheduler.config.include_end_by = true;
    scheduler.config.repeat_precise = true;

    scheduler.init('scheduler_here', new Date(), "month");
}

$(document).ready(function () {

    //load courses
    firebase.database().ref('courses').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            $('#calendar-cours-table').empty();
            for (let i = 0; i < data.length; i++) {
                const cours = data[i];
                $('#calendar-cours-table').append('<tr class="selectable-row" id="' + i + '"> <td class="is-checkbox-cell"> <label class="b-checkbox checkbox"> <input type="checkbox" value="false"> <span class="check"></span> </label> </td> <td class="is-image-cell"> <div class="image"> <img src="https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg" class="is-rounded"> </div> </td> <td data-label="Name">' + cours.name + '</td> </tr>')
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
            if (snapshot.exists()) {
                const data = snapshot.val();
                scheduler.clearAll();
                for (let i = 0; i < data.length; i++) {
                    const event = data[i];
                    scheduler.parse([
                        { text: event.text, start_date: event.start_date, end_date: event.end_date },
                    ], "json");
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
                console.log(localStorage.getItem("selected-cours"))
                firebase.database().ref('courses/' + localStorage.getItem("selected-cours") + '/events').limitToLast(1).once('value').then(function (snapshot) {
                    let event_num = 0
                    if (snapshot.exists()) {
                        event_num = parseInt(Object.keys(snapshot.val())[0]) + 1
                    }
                    console.log(localStorage.getItem("selected-cours"))
                    firebase.database().ref('courses/' + localStorage.getItem("selected-cours") + '/events/' + event_num).set({
                        text: data.text,
                        start_date: data.start_date,
                        end_date: data.end_date
                    });
                });

            case "update":

                break;
            case "delete":

                break;
        }
    });
})