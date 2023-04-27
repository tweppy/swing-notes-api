const express = require("express");
const router = express.Router();

const { auth, checkHeaders } = require("../middleware/usersMiddleware");
const { get, add, edit, remove, search } = require("../controllers/notesController");
const {
  checkBody,
  checkLength,
  checkNoteTitle,
  checkNoteId,
  checkEditedBody,
  searchByTitle,
  checkSearchBody,
} = require("../middleware/notesMiddleware");

router.get("/", checkHeaders, auth, get);
router.post("/", checkHeaders, auth, checkBody, checkLength, checkNoteTitle, add);
router.put("/", checkHeaders, auth, checkNoteId, checkEditedBody, checkLength, edit);
router.delete("/", checkHeaders, auth, checkBody, checkNoteId, remove);
router.get("/search", checkHeaders, auth, checkSearchBody, searchByTitle, search);

module.exports = router;