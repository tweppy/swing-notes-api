const {
  getAllNotes,
  addNote,
  editNote,
  removeNote,
  findNoteByTitle,
} = require("../models/notesModel");
const { findUserByID } = require("../models/userModel");

async function get(req, res) {
  const { userID } = req.body;
  const data = await getAllNotes(userID);
  res.status(200).json(data);
}

async function add(req, res) {
  const data = req.body;
  const user = await findUserByID(req.id);
  await addNote(data, user);

  const result = {
    message: `${data.title} added to notes.`,
    username: user.username,
    userID: user.userID,
    note: data,
  };

  res.status(200).json(result);
}

async function edit(req, res) {
  const data = req.body;
  await editNote(data);

  res.status(200).json({ message: `Note '${data.id}' has been edited.` });
}

async function remove(req, res) {
  const data = req.body;
  await removeNote(data);

  res.status(200).json({ message: `Note with id '${data.id}' deleted.` });
}

async function search(req, res) {
  const { title } = req.body;
  const result = await findNoteByTitle(title);

  res.status(200).json({ result: result });
}

module.exports = { add, get, edit, remove, search };
