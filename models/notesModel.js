const Datastore = require("nedb-promises");
let notesDB = Datastore.create("./databases/notes.db");
const { v4: uuidv4 } = require("uuid");

async function getAllNotes(userID) {
  return await notesDB.find({ userID: userID });
}

async function findNoteByTitle(title) {
  return await notesDB.findOne({ title: title });
}

async function findNoteById(id) {
  return await notesDB.findOne({ id: id });
}

async function addNote(data, user) {
  const noteObj = {
    id: uuidv4(),
    title: data.title,
    text: data.text,
    createdAt: new Date().toLocaleString(),
    modifiedAt: new Date().toLocaleString(),
    username: user.username,
    userID: user.userID,
  };

  return await notesDB.insert(noteObj);
}

//Must have title, text, id when trying to edit. If editing title only, text field can be empty string, but the prop must be there
async function editNote(data) {
  const matchNote = await findNoteById(data.id);

  const noteObj = {
    $set: {
      title: data.title ? data.title : matchNote.title,
      text: data.text ? data.text : matchNote.text,
      modifiedAt: new Date().toLocaleString(),
    },
  };

  return await notesDB.update({ id: data.id }, noteObj);
}

async function removeNote(data) {
  return await notesDB.remove({ id: data.id });
}

module.exports = {
  getAllNotes,
  findNoteByTitle,
  findNoteById,
  addNote,
  editNote,
  removeNote,
};
