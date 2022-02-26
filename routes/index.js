var express = require("express");
var router = express.Router();

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
    res.render("thank", { title: "Email sent" });
  });

module.exports = router;
