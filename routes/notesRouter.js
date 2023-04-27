const express = require("express");
const router = express.Router();

const { auth, checkHeaders, authUser } = require("../middleware/usersMiddleware");
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

router.get("/", checkHeaders, auth, authUser, get);
router.post("/", checkBody, checkLength, checkNoteTitle, checkHeaders, auth, authUser, add);
router.put("/", checkNoteId, checkEditedBody, checkLength, checkHeaders, auth, authUser, edit);
router.delete("/", checkNoteId, checkBody, checkHeaders, auth, authUser, remove);
router.get("/search", checkSearchBody, checkHeaders, auth, authUser, searchByTitle, search);

module.exports = router;