const express = require("express");
const router = express.Router();

const { auth,  authUser } = require("../middleware/usersMiddleware");
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

router.get("/", auth, authUser, get);
router.post("/", checkBody, checkLength, checkNoteTitle, auth, authUser, add);
router.put("/", checkNoteId, checkEditedBody, checkLength, auth, authUser, edit);
router.delete("/", checkNoteId, checkBody, auth, authUser, remove);
router.get("/search", checkSearchBody, auth, authUser, searchByTitle, search);

module.exports = router;