const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res) => {
  const show = !req.session.vote;
  Quiz.find((err, data) => {
    let sum = 0;
    data.forEach((item) => {
      sum = sum + item.vote;
    });

    res.render("quiz", { title: "Quiz", data, show, sum });
  });
});

router.post("/", (req, res) => {
  const { quiz } = req.body;

  Quiz.findOne({ _id: quiz }, (err, data) => {
    data.vote = data.vote + 1;
    data.save((err) => {
      req.session.vote = 1;
      res.redirect("/quiz");
    });
  });
});

module.exports = router;
