const Datastore = require("nedb-promises");
let notesDB = Datastore.create("./databases/notes.db");
const { v4: uuidv4 } = require("uuid");
const { setDate } = require("../utils");

//get all notes
async function getAllNotes() {
  return await notesDB.find({});
  //notesDB.remove({}, { multi: true })
}

//find note by title
async function findNoteByTitle(title) {
  return await notesDB.findOne({ title: title });
}

//add note
async function addNote(data) {
  const noteObj = {
    id: uuidv4(),
    title: data.title,
    text: data.text,
    createdAt: setDate,
    modifiedAt: setDate,
  };

  return await notesDB.insert(noteObj);
}

//edit note
async function editNote() {}

//delete note
async function removeNote() {}

module.exports = {
  getAllNotes,
  findNoteByTitle,
  addNote,
  editNote,
  removeNote,
};

/*
id	        String	Ett genererat ID för denna anteckning.
title	    String	Titeln på anteckningen. Max 50 tecken.
text	    String	Själva anteckningstexten, max 300 tecken.
createdAt	Date	När anteckningen skapades.
modifiedAt	Date	När anteckningen sist modifierades.
*/
