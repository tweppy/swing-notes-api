const { findNoteByTitle, findNoteById } = require("../models/notesModel");

const errorMessages = {
  invalidBody: "Invalid body input.",
  invalidBodyEdited:
    "You must include a text and title field, even if only editing one of them. You can leave the other field empty.",
  invalidLength:
    "Invalid character length. Title length must be between 2-50 characters and text 2-300 characters. If editing a note, at least one field must be changed.",
  invalidId: "Invalid ID.",
  titleTaken:
    "A note with that title already exists. Please use a different title.",
};

//checkBody
function checkBody(req, res, next) {
  const body = req.body;
  const titleAndText = body.title && body.text;
  // const user = body.userID

  titleAndText || body.id
    ? next()
    : res.status(400).json({ error: errorMessages.invalidBody });
}

//check edited body
function checkEditedBody(req, res, next) {
  const body = req.body;
  const checkProps =
    body.hasOwnProperty("title") && body.hasOwnProperty("text");

  checkProps
    ? next()
    : res.status(500).json({ error: errorMessages.invalidBodyEdited });
}

//length check
function checkLength(req, res, next) {
  const { title, text } = req.body;
  const titleLength = title.length <= 50 && title.length >= 2;
  const textLength = text.length <= 300 && text.length >= 2;

  const lengthSpec = {
    yourTitleLength: `${title.length}`,
    yourTextLength: `${text.length}`,
  };

  title && text && titleLength && textLength
    ? next()
    : !text && title && titleLength
    ? next()
    : !title && text && textLength
    ? next()
    : res
        .status(400)
        .json({ error: errorMessages.invalidLength, lengthError: lengthSpec });
}

//checkNoteTitle
async function checkNoteTitle(req, res, next) {
  const { title } = req.body;
  const note = await findNoteByTitle(title);

  !note ? next() : res.json({ error: errorMessages.titleTaken });
}

//note id check
async function checkNoteId(req, res, next) {
  const { id } = req.body;
  const note = await findNoteById(id);

  note ? next() : res.status(400).json({ error: errorMessages.invalidId });
}

module.exports = {
  checkBody,
  checkLength,
  checkNoteTitle,
  checkNoteId,
  checkEditedBody,
};
