showNotes();
// Enter the notes
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addText = document.getElementById("addText");
    let noteHead = document.getElementById("noteHead");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (addText.value != "") {

        let noteObj = {
            title: noteHead.value , 
            text: addText.value
        }
        notesObj.push(noteObj);
        // console.log(notesObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addText.value = "";
        noteHead.value = "";
    }
    showNotes();
})

// show notes
function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = ""
    // console.log("helllo",typeof(notesObj));
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index + 1}. ${element.title}</h5>
                    <p class="card-text"> ${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } 
    else {
        notesElm.innerHTML = `Nothing to show! Add a note.`;
    }
}

// delete Note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search note
let search = document.getElementById('searchBtn');
search.addEventListener("click", function () {
    event.preventDefault();
    let searchTxt = document.getElementById('searchText');
    let inputVal = searchTxt.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        cardTxt = cardTxt.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
