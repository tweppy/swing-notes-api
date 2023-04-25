const {
  getAllNotes,
  addNote,
  editNote,
  removeNote,
} = require("../models/notesModel");

//move?
const result = {
  success: true,
};

//get
async function get(req, res) {
  const data = await getAllNotes();
  res.status(200).json(data);
}

//add
async function add(req, res) {
  const data = req.body;

  await addNote(data);

  result.message = `${data.title} added.`;
  result.note = data;
  res.status(200).json(result);
}

//edit

//remove

module.exports = { add, get };
