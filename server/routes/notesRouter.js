const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNote,
  postNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const { auth } = require("../utils");

router.get("/", getNotes);

router.get("/note/:id", auth, getNote);

router.post("/", auth, postNote);

router.patch("/note/:id", auth, updateNote);

router.delete("/note/:id", auth, deleteNote);

module.exports = router;
