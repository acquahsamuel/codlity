const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const config = require("./config");
require("./passport");

const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");

mongoose.connect(config.dbConnstring);
global.User = require("./models/User");
global.Task = require("./models/Task");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(
  session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

//initailize session - Get authenticated user
app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

app.use("/", indexRoute);
app.use("/", authRoute);
app.use("/", taskRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
