const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "Please enter value"],
  },
  totalWords: {
    type: Number,
  },
  totalCharacters: {
    type: Number,
  },
  totalSentences: {
    type: Number,
  },
  totalParagraphs: {
    type: Number,
  },
  longestWords: {
    type: [],
  },
});

module.exports = mongoose.model("texts", TextSchema);
