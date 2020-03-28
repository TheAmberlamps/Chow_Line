var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var grocery = require("../models/grocery.js");

router.get("/", function(req, res) {
  grocery.selectAllUsers(function(data) {
    var hbsObject1 = {
      users: data
    };
    console.log(hbsObject1);
    // res.render("index", hbsObject1);
  });
  grocery.selectAllFood(function(data) {
    var hbsObject2 = {
      groceries: data
    };
    console.log(hbsObject2);
    // res.render("index", hbsObject2);
  });
  res.render("index");
});

module.exports = router;
