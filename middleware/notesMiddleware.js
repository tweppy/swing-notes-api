const { findNoteByTitle, findNoteById } = require("../models/notesModel");

const result = {
  success: false,
};

//checkBody
function checkBody(req, res, next) {
  const { title, text } = req.body;

  if (title && text) {
    next();
  } else {
    result.message = "Invalid body input. Please enter a valid title and text.";
    result.hasTitle = body.hasOwnProperty("title");
    result.hasText = body.hasOwnProperty("text");

    res.status(400).json(result);
  }
}

//check edited body
function checkEditedBody(req, res, next) {
  const body = req.body;

  if (body.hasOwnProperty("title") && body.hasOwnProperty("text")) {
    next();
  } else {
    result.error =
      "You must include a text and title field, even if only editing one of them. You can leave the other field empty.";
    res.status(500).json(result);
  }
}

function checkLength(req, res, next) {
  const { title, text } = req.body;
  const titleLength = title.length <= 50 && title.length >= 2;
  const textLength = text.length <= 300 && text.length >= 2;

  result.error =
    "Invalid character length. Title length must be between 2-50 characters and text 2-300 characters. If editing a note, at least one field must be changed.";
  result.yourTitleLength = `${title.length}`;
  result.yourTextLength = `${text.length}`;

  title && text && titleLength && textLength
    ? next()
    : (title && titleLength) || (text && textLength)
    ? next()
    : res.status(400).json(result);
}

//checkNoteTitle
async function checkNoteTitle(req, res, next) {
  const { title } = req.body;
  const note = await findNoteByTitle(title);

  if (!note) {
    next();
  } else {
    //it'll show old failed title.length and nto for current error if do reg result obj
    res.status(400).json({
      error: `A note with the title '${title}' already exists. Please use a different title.`,
    });
  }
}

async function checkNoteId(req, res, next) {
  const { id } = req.body;
  const note = await findNoteById(id);

  if (note) {
    next();
  } else {
    res.status(404).json({
      error: `Couldn't find a note with id: '${id}'.`,
    });
  }
}

module.exports = {
  checkBody,
  checkLength,
  checkNoteTitle,
  checkNoteId,
  checkEditedBody,
};
