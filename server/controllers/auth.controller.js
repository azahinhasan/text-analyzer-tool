const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
//const expressJwt = require("express-jwt");
const config = require("../config/config");

const signIn = async (req, res) => {
  try {
    res.status(400).json({ success: false, message: "Could not sign in" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Could not sign in" });
  }
};

const signOut = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "signed out" });
};

module.exports = { signIn, signOut };
