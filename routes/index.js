var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var config = require("../config");
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Codlity. Learn coding" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "Codlity. Learn coding" });
});

router
  .route("/contact")
  .get(function (req, res, next) {
    res.render("contact", {
      title: "Codlity. Learn coding"
    });
  })
  .post(function (req, res, next) {
    req.checkBody("name", "Empty name").notEmpty();
    req.checkBody("email", "Invalid email").isEmail();
    req.checkBody("message", "Empty message").notEmpty();
    var errors = req.validationErrors();

    if (errors) {
      res.render("contact", {
        title: "Codlity.",
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: "Codlity <no-reply@codlity.com>",
        to: process.env.EMAIL,
        subject: "You got a new message from visitor",
        text: req.body.message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        res.render("thank", {
          title: "Codlity - a platform for sharing code."
        });
      });
    }
  });

module.exports = router;
