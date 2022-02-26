const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login you account" });
});

router
  .route("/register")
  .get("/register", function (req, res, next) {
    res.render("register", { title: "Register a new account" });
  })
  .post(function (req, res, next) {
    req.checkBody("name", "Empty Name").notEmpty();
    req.checkBody("email", "Invalid Email").notEmpty();
    req.checkBody("password", "Empty Password").notEmpty();
    req
      .checkBody("password", "Password do not match")
      .equals(req.body.confirmPassword)
      .notEmpty();

    let errors = req.validationErrors();
    if (errors) {
      res.render("register", {
        name: req.body.name,
        email: req.body.email,
        errorMessages : errors
      });
    }
  });
