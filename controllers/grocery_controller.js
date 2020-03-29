var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var grocery = require("../models/grocery.js");

router.get("/", function(req, res) {
  grocery.selectAllFood(function(data) {
    var hbsObject = {
      groceries: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

module.exports = router;
