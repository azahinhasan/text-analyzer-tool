const Text = require("../models/text.model");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const redis_cache = require("../config/redis_cache");
const {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  longestWordsInParagraphs,
} = require("../helpers/paragraphsInfo");

const getTextList = async (req, res) => {
  try {
    const list = await Text.find({}, { value: 1 });
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
    let text;
    const cacheData = await redis_cache.get(req.params.textId);
    //checking from redis
    if (cacheData) {
      text = JSON.parse(cacheData);
    } else {
      text = await Text.findById(req.params.textId);
      await redis_cache.set(req.params.textId, JSON.stringify(text));
    }

    if (!text) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    if (text.created_by?.toString() === req.session.user_id) {
      return res.status(200).json({
        success: true,
        message: "Data Found Successfully",
        data: text,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data Found Successfully",
      data: { value: text.value, _id: text.id },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

const createText = async (req, res) => {
  try {
    const newData = await Text.create({
      ...req.body,
      total_words: countWords(req.body.value),
      total_characters: countCharacters(req.body.value),
      total_sentences: countSentences(req.body.value),
      total_paragraphs: countParagraphs(req.body.value),
      longest_words: longestWordsInParagraphs(req.body.value),
      created_by: req.session.user_id,
    });

    await redis_cache?.set(newData._id.toString(), JSON.stringify(newData)); //saving into redis

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
    await redis_cache?.del(req.params.textId);
    res
      .status(200)
      .json({ success: true, message: "Text deleted", data: text });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateText = async (req, res) => {
  try {
    const updatedText = {
      ...req.body,
      total_words: countWords(req.body.value),
      total_characters: countCharacters(req.body.value),
      total_sentences: countSentences(req.body.value),
      total_paragraphs: countParagraphs(req.body.value),
      longest_words: longestWordsInParagraphs(req.body.value),
    };
    const text = await Text.findByIdAndUpdate(req.params.textId, updatedText);
    if (!text) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    text.save();
    await redis_cache.set(
      text._id.toString(),
      JSON.stringify({ ...updatedText, created_by: text.created_by })
    ); //updating data of redis
    res
      .status(200)
      .json({ success: true, message: "Text updated", data: updatedText });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getParagraphsInfoByAction = async (req, res) => {
  try {
    let result;
    const text = req.query.paragraph;
    switch (req.params.actonType.toLowerCase()) {
      case "total-words":
        result = countWords(text);
        break;
      case "total-characters":
        result = countCharacters(text);
        break;
      case "total-sentences":
        result = countSentences(text);
        break;
      case "total-paragraphs":
        result = countParagraphs(text);
        break;
      case "longest-words":
        result = longestWordsInParagraphs(text);
        break;
      default:
        return res
          .status(404)
          .json({ success: true, message: "No acton type found" });
    }
    res.status(200).json({
      success: true,
      message: "Text updated",
      [req.params.actonType.toLowerCase().replace("-", "_")]: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getTextListByUserId = async (req, res) => {
  try {
    const list = await Text.find({
      created_by: req.session.user_id,
    });
    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: list });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

module.exports = {
  getTextList,
  createText,
  getTextByID,
  deleteText,
  updateText,
  getParagraphsInfoByAction,
  getTextListByUserId,
};
