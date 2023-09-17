const note_id_prefix = "note_";
const update_msg = "stored at: ";
const am = "AM";
const pm = "PM";

if (typeof Storage == "undefined") {
    document.write(msg_notSupported);
    window.stop();
}

function updateTime() {
    let date = new Date();
    let hours = date.getHours();
    let time = hours < 12 ? am : pm;
    hours = hours <= 12 ? hours : hours - 12;
    let str = update_msg + hours + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + time;
    document.getElementById("time").innerHTML = str;
}

function createReaderNote(listItem, note) {
    let input = document.createElement("textarea");
    input.id = note_id_prefix + note.id;
    input.value = note.text;
    input.readOnly = true;

    listItem.appendChild(input);
}

function initialize() {
    console.log(localStorage);

    let notes = document.getElementById("notes");
    for (let i = 0; i < localStorage.length; i++) {
        let li = document.createElement("li");
        li.id = i;
        let note = JSON.parse(localStorage[i]);
        createReaderNote(li, note);
        notes.appendChild(li);
    }

    updateTime();
}

function autoUpdate() {
    let notes = document.getElementById("notes");
    notes.innerHTML = "";
    // console.log(localStorage);
    for (let i = 0; i < localStorage.length; i++) {
        let li = document.createElement("li");
        li.id = i;
        let note = JSON.parse(localStorage[i]);
        createReaderNote(li, note);
        notes.appendChild(li);
    }

    updateTime();
}

initialize();

setInterval(autoUpdate, 2000);
