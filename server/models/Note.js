const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", NoteSchema);
