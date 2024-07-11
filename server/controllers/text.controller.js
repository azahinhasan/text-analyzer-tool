const Text = require("../models/text.model");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const getTextList = async (req, res) => {
  try {
    const list = await Text.find();

    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: list });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const getTextByID = async (req, res) => {
  try {
    const text = await Text.findById(req.params.textId);

    if (!text) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: text });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const createText = async (req, res) => {
  try {
    const newData = await Text.create(req.body);
    newData.save();
    res
      .status(200)
      .json({ success: true, message: "Created Successfully", data: newData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const deleteText = async (req, res) => {
  try {
    const text = await Text.findByIdAndDelete(req.params.textId);
    if (!text) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Text deleted", data: text });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateText = async (req, res) => {
  try {
    const text = await Text.findByIdAndUpdate(req.params.textId, req.body);
    if (!text) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Text updated", data: text });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTextList,
  createText,
  getTextByID,
  deleteText,
  updateText,
};
