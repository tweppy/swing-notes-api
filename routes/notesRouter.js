const express = require("express");
const router = express.Router();

module.exports = router;

/*
/api/notes	        GET     -   Hämta anteckningar
/api/notes	        POST    -   Spara en anteckning
/api/notes	        PUT     -   Ändra en anteckning
/api/notes	        DELETE  -   Ta bort en anteckning

/api/notes/search	GET     -   Söka bland anteckningar (VG-krav). 
                                Sökning sker på titel.
*/