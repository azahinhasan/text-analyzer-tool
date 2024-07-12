const textCtrl = require("../controllers/text.controller");
const authCheck = require("../middleware/auth_check");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(textCtrl.getTextList)
  .post(authCheck.verifyToken, textCtrl.createText);

router
  .route("/paragraph-info/:actonType")
  .get(authCheck.verifyToken, textCtrl.getParagraphsInfoByAction);

router
  .route("/:textId")
  .get(authCheck.verifyToken, textCtrl.getTextByID)
  .put(authCheck.verifyToken, textCtrl.updateText)
  .delete(authCheck.verifyToken, textCtrl.deleteText);

module.exports = router;
