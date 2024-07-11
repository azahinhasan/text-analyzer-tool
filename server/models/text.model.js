const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "Please enter value"],
  },
});

module.exports = mongoose.model("texts", TextSchema);
