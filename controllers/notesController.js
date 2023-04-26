const {
  getAllNotes,
  addNote,
  editNote,
  removeNote,
  searchTitle,
} = require("../models/notesModel");
const { findUserByID, findUser } = require("../models/userModel");

//get
async function get(req, res) {
  const data = await getAllNotes();
  res.status(200).json(data);
}

//add
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

//edit
async function edit(req, res) {
  const data = req.body;
  await editNote(data);

  res.status(200).json({ message: `Note '${data.id}' has been edited.` });
}

//remove
async function remove(req, res) {
  const data = req.body;
  await removeNote(data);

  res.status(200).json({ message: `Note with id '${data.id}' deleted.` });
}

async function search(req, res) {
  const { title } = req.body;

  const result = await searchTitle(title);

  res.status(200).json({ result: result });
}

module.exports = { add, get, edit, remove, search };
