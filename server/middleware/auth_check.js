const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = async (req, res, next) => {
  try {
    if (!req.session.token) {
      return res.status(403).json({
        success: false,
        message: "No token found.Please Log in.",
      });
    }
    const decoded = jwt.verify(req.session.token, config.JWT_SECRET);
    req.session.user_id = decoded._id;
    next();
  } catch (err) {
    req.session.token = "";
    return res.status(401).json({
      success: false,
      message: "You are not authorized to perform this action.",
    });
  }
};

module.exports = { verifyToken };
