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

  try {
    const data = await getAllNotes(userID);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function add(req, res) {
  const data = req.body;

  try {
    const user = await findUserByID(req.id);
    await addNote(data, user);
    const result = {
      message: `${data.title} added to notes.`,
      username: user.username,
      userID: user.userID,
      note: data,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function edit(req, res) {
  const data = req.body;

  try {
    await editNote(data);
    res.status(200).json({ message: `Note '${data.id}' has been edited.` });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function remove(req, res) {
  const data = req.body;

  try {
    await removeNote(data);
    res.status(200).json({ message: `Note with id '${data.id}' deleted.` });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function search(req, res) {
  const { title } = req.body;

  try {
    const result = await findNoteByTitle(title);
    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { add, get, edit, remove, search };
