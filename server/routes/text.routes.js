const textCtrl = require("../controllers/text.controller");
const authCheck = require("../middleware/auth_check");
const express = require("express");
const router = express.Router();

router.route("/").get(textCtrl.getTextList).post(textCtrl.createText);

router
  .route("/:textId")
  .get(textCtrl.getTextByID)
  .put(textCtrl.updateText)
  .delete(textCtrl.deleteText);

module.exports = router;
