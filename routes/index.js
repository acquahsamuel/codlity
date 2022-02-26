const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const config = require("../config");
const transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Codlity" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "Codlity About" });
});

router
  .route("/contact")
  .get(function (req, res, next) {
    res.render("contact", { title: "Codlity interactive coding platform" });
  })
  .post(function (req, res, next) {
    req.checkBody("name", "Empty name").notEmpty();
    req.checkBody("email", "Email is required").isEmail();
    req.checkBody("message", "Empty message").notEmpty();

    let errors = req.validationErrors();
    if (errors) {
      res.render("contact", {
        title: "Codlity code sharing",
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      let mailOptions = {
        from: req.body.email,
        to: "micropplejame01@gmail.com",
        subject: "You have got a new email for codilty  😎",
        text: req.body.message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // throw Er
          return console.log(error);
        }
        res.render("thank", { title: "Email sent" });
      });
    }
  });


module.exports = router;

