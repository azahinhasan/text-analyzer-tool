const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "Please enter value"],
  },
  total_words: {
    type: Number,
  },
  total_characters: {
    type: Number,
  },
  total_sentences: {
    type: Number,
  },
  total_paragraphs: {
    type: Number,
  },
  longest_words: {
    type: [],
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("texts", TextSchema);
