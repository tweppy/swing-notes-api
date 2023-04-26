const express = require("express");
const router = express.Router();

const { auth, checkHeaders } = require("../middleware/usersMiddleware");
const { get, add, edit, remove } = require("../controllers/notesController");
const {
  checkBody,
  checkLength,
  checkNoteTitle,
  checkNoteId,
  checkEditedBody,
} = require("../middleware/notesMiddleware");

router.get("/", checkHeaders, auth, get);
router.post("/", checkBody, checkLength, checkNoteTitle, checkHeaders, auth, add);
router.put("/", checkNoteId, checkEditedBody, checkLength, checkHeaders,  auth, edit);
router.delete("/", checkBody, checkNoteId, checkHeaders, auth, remove);

//use findNoteByTitle
router.get("/search");

module.exports = router;

/*
/api/notes	        GET     -   Hämta anteckningar
/api/notes	        POST    -   Spara en anteckning
/api/notes	        PUT     -   Ändra en anteckning
/api/notes	        DELETE  -   Ta bort en anteckning

/api/notes/search	GET     -   Söka bland anteckningar (VG-krav). 
                                Sökning sker på titel.
*/
