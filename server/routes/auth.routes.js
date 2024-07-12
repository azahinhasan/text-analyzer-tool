const authCtrl = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.route("/sign-in").post(authCtrl.signIn);

router.route("/sign-out").get(authCtrl.signOut);

router.route("/sign-up").post(authCtrl.signUp);

module.exports = router;
