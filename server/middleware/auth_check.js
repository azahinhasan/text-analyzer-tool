const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.session.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found.Please Log in.",
      });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);
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
