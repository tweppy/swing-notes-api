const express = require("express");
const router = express.Router();

const { get, add, edit, remove } = require("../controllers/notesController");
const {
  checkBody,
  checkLength,
  checkNoteTitle, checkNoteId, checkEditedBody
} = require("../middleware/notesMiddleware");

router.get("/", get);
router.post("/", checkBody, checkLength, checkNoteTitle, add);
router.put("/", checkNoteId, checkEditedBody, checkLength, edit);
router.delete("/");

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
