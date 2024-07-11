const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const rateLimit = require("express-rate-limit");

const app = express();
const server = http.Server(app);

// Config
const config = require("./config/config");

// Import Routes
const usersRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const textRoutes = require("./routes/text.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Define the rate limit rule
const apiLimiter = rateLimit({
  windowMs: config.THROTTLING_WINDOW_MS,
  max: config.THROTTLING_LIMIT_EACH_IP,
  message: "Too many requests from this IP, please try again after 10 minutes.",
});

// Mount routes
app.use("/api/user", apiLimiter, usersRoutes);
app.use("/auth", authRoutes);
app.use("/api/text", apiLimiter, textRoutes);

// connect to the database
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

// Home
app.get("/", function (req, res) {
  res
    .status(200)
    .json({ success: true, messages: "Welcome to API home page!" });
});

// Listen to the PORT
app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`);
});

module.exports = { app, server, mongoose };
