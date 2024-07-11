const authCtrl = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.route("/signIn").post(authCtrl.signIn);

router.route("/signOut").get(authCtrl.signOut);

module.exports = router;
