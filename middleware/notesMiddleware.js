const { findNoteByTitle, findNoteById } = require("../models/notesModel");
const { noteErrors } = require("../errorMessages");

function checkBody(req, res, next) {
  const body = req.body;
  const titleAndTextAndUser = body.title && body.text && body.userID;
  const noteIDAndUserID = body.id && body.userID;

  titleAndTextAndUser || noteIDAndUserID
    ? next()
    : res.status(400).json({ error: noteErrors.invalidBody });
}

function checkSearchBody(req, res, next) {
  const { title, userID } = req.body;

  title && userID
    ? next()
    : res.status(400).json({ error: noteErrors.invalidBody });
}

function checkEditedBody(req, res, next) {
  const body = req.body;
  const checkProps =
    body.hasOwnProperty("title") && body.hasOwnProperty("text") && body.userID;

  checkProps
    ? next()
    : res.status(400).json({ error: noteErrors.invalidBodyEdited });
}

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
        .json({ error: noteErrors.invalidLength, lengthError: lengthSpec });
}

async function checkNoteTitle(req, res, next) {
  const { title } = req.body;
  const note = await findNoteByTitle(title);

  !note ? next() : res.status(409).json({ error: noteErrors.titleTaken });
}

async function searchByTitle(req, res, next) {
  const { title, userID } = req.body;
  const note = await findNoteByTitle(title);
  const searchOnlyThisUsersNotes = note.userID === userID;

  note && searchOnlyThisUsersNotes
    ? next()
    : res.status(404).json({ error: noteErrors.titleNotFound });
}

async function checkNoteId(req, res, next) {
  const { id, userID } = req.body;
  const note = await findNoteById(id);
  const matchUserToNote = note?.userID === userID;

  note && matchUserToNote ? next() : res.status(404).json({ error: noteErrors.invalidId });
}

module.exports = {
  checkBody,
  checkLength,
  checkNoteTitle,
  checkNoteId,
  checkEditedBody,
  searchByTitle,
  checkSearchBody,
};
