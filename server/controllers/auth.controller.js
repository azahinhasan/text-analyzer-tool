const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
//const expressJwt = require("express-jwt");
const config = require("../config/config");

const signIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .send({ error: "Email and password don't match. " });
    }
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    req.session.token = token;
    return res.json({
      success: true,
      message: "Successfully loggedIn!",
      token,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Could not sign in" });
  }
};

const signOut = (req, res) => {
  req.session.token = "";
  return res.status(200).json({ success: true, message: "signed out" });
};

const signUp = async (req, res) => {
  try {
    const newData = await User.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Created Successfully", data: newData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = { signIn, signOut, signUp };
