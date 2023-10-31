const Note = require("../models/Note");
const mongoose = require("mongoose");

const getNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ createdAt: -1 });
  res.status(200).json({ notes: notes });
};

const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  if (req.user._id !== note.userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  res.status(200).json(note);
};

const postNote = async (req, res) => {
  const { title, text } = req.body;
  const userId = req.user._id;
  const username = req.user.username;

  try {
    const note = await Note.create({ title, text, userId, username });
    res.status(200).json({ note: note });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  if (req.user._id !== note.userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  res.status(200).json({ message: "Note updated", note: note });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  if (req.user._id !== note.userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  res.status(200).json({ message: "Note deleted" });
};

module.exports = { postNote, getNote, getNotes, updateNote, deleteNote };
