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
} = require("../middleware/notesMiddleware");

router.get("/", checkHeaders, auth, get);
router.post("/", checkHeaders, auth, checkBody, checkLength, checkNoteTitle, add);
router.put("/", checkHeaders, auth, checkNoteId, checkEditedBody, checkLength, edit);
router.delete("/", checkHeaders, auth, checkBody, checkNoteId, remove);

//use findNoteByTitle
router.get("/search", checkHeaders, auth, search);

module.exports = router;

/*
/api/notes	        GET     -   Hämta anteckningar
/api/notes	        POST    -   Spara en anteckning
/api/notes	        PUT     -   Ändra en anteckning
/api/notes	        DELETE  -   Ta bort en anteckning

/api/notes/search	GET     -   Söka bland anteckningar (VG-krav). 
                                Sökning sker på titel.
*/
