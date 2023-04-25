const { findNoteByTitle } = require("../models/notesModel");

const result = {
  success: false,
};

//checkBody
function checkBody(req, res, next) {
  const {title, text} = req.body;

  if (title && text) {
    next();
  } else {
    result.message = "Invalid body input. Please enter a valid title and text.";
    result.hasTitle = body.hasOwnProperty("title");
    result.hasText = body.hasOwnProperty("text");

    res.status(400).json(result);
  }
}

function checkLength(req, res, next) {
  const { title, text } = req.body;

  if (title.length < 50 && text.length < 300) {
    next();
  } else {
    result.error =
      "Invalid character length. Title length cannot exceed 50 characters and text cannot exceed 300 characters.";
    result.yourTitleLength = `${title.length}`;
    result.yourTextLength = `${text.length}`;
    
    res.status(400).json(result);
  }
}

//checkNoteTitle (taken)
async function checkNoteTitle(req, res, next) {
  const { title } = req.body;

  const note = await findNoteByTitle(title);

  if (!note) {
    next();
  } else {
    result.error = `A note with the title '${title}' already exists. Please use a different title.`;

    res.json(result);
  }
}

module.exports = { checkBody, checkLength, checkNoteTitle };
