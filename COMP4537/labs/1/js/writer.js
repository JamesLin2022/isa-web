const msg_notSupported = "Sorry web Storage is not supported!";
const input_id_prefix = "input_";
const input_default_text = "Note ";
const remove_id_prefix = "remove_";
const remove_text = "remove";
const update_msg = "stored at: ";
const am = "AM";
const pm = "PM";

let updateQueue = 0;

if (typeof Storage == "undefined") {
    document.write(msg_notSupported);
    window.stop();
}

function Note(id, text) {
    this.id = id;
    this.text = text;
}

function updateTime() {
    let date = new Date();
    let hours = date.getHours();
    let time = hours < 12 ? am : pm;
    hours = hours <= 12 ? hours : hours - 12;
    let str = update_msg + hours + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + time;
    document.getElementById("time").innerHTML = str;
}

function createListItem(index) {
    let li = document.createElement("li");
    li.id = index;
    li.class = "note";
    return li;
}

function createWriterNote(listItem, note, newItem) {
    let input = document.createElement("textarea");
    // input.type = "text";
    input.value = newItem ? input_default_text + note.id : note.text;
    input.id = input_id_prefix + note.id;

    listItem.appendChild(input);

    let remove = document.createElement("button");
    remove.onclick = function () { removeNote(note.id) };
    remove.id = remove_id_prefix + note.id;
    remove.innerHTML = remove_text;

    listItem.appendChild(remove);
}

function updateNoteID(note, index) {
    try {
        let li = document.getElementById(note.id);
        li.id = index;

        let input = document.getElementById(input_id_prefix + note.id);
        input.id = input_id_prefix + index;

        let remove = document.getElementById(remove_id_prefix + note.id);
        remove.id = remove_id_prefix + index;
        remove.onclick = function () { removeNote(index) };
    } catch (error) {
        console.log("Too Fast Exception!");
    }
}

function addNote() {
    // console.log(localStorage);

    let index = updateQueue + localStorage.length;
    let note = new Note(index, input_default_text + index);

    let li = createListItem(index);
    createWriterNote(li, note, true);
    document.getElementById("notes").appendChild(li);
    updateQueue++;

    // console.log(localStorage);
}

function removeNote(key) {
    // console.log(localStorage);

    document.getElementById(key).remove();

    let keys = Object.keys(localStorage).sort();

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] > key) {

            let note = JSON.parse(localStorage[keys[i]]);
            updateNoteID(note, note.id - 1);

        }
    }

    updateQueue--;

    // console.log(localStorage);
}

function initialize() {
    console.log(localStorage);

    updateTime();

    let notes = document.getElementById("notes");
    for (let i = 0; i < localStorage.length; i++) {
        let note = JSON.parse(localStorage[i]);

        let li = createListItem(i);
        createWriterNote(li, note, false);
        notes.appendChild(li);
    }
}

function autoUpdate() {
    let listItems = document.getElementsByTagName("li");
    updateQueue = 0;

    

    for (let i = 0; i < listItems.length; i++) {
        localStorage.setItem(listItems[i].id, JSON.stringify(new Note(listItems[i].id, listItems[i].firstChild.value)));
    }

    if (localStorage.length > listItems.length) {

        let keys = Object.keys(localStorage).sort();

        let idList = [];
        for (let i = 0; i < listItems.length; i++) {
            idList.push(listItems[i].id);
        }

        for (let i = 0; i < keys.length; i++) {
            if (!idList.includes(keys[i])) {
                localStorage.setItem(i, JSON.stringify(new Note(i, localStorage[keys[i].text])));
                localStorage.removeItem(keys[i]);
            }
        }
    }

    updateTime();

}

initialize();

setInterval(autoUpdate, 2000);
