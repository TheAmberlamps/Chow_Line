var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var grocery = require("../models/grocery.js");

router.get("/", function(req, res) {
  grocery.selectAll(function(data) {
    var hbsObject = {
      users: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

module.exports = router;
