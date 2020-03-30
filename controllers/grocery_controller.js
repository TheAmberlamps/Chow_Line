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

router.get("/produce", function(req, res) {
  grocery.selectAllFood(function(data) {
    var hbsObject = {
      groceries: data
    };
    console.log(hbsObject);
    res.render("produce", hbsObject);
  });
});

router.get("/dairy", function(req, res) {
  grocery.selectAllFood(function(data) {
    var hbsObject = {
      groceries: data
    };
    console.log(hbsObject);
    res.render("dairy", hbsObject);
  });
});

router.get("/meat&seafood", function(req, res) {
  grocery.selectAllFood(function(data) {
    var hbsObject = {
      groceries: data
    };
    console.log(hbsObject);
    res.render("meat", hbsObject);
  });
});

router.get("/pantry", function(req, res) {
  grocery.selectAllFood(function(data) {
    var hbsObject = {
      groceries: data
    };
    console.log(hbsObject);
    res.render("pantry", hbsObject);
  });
});

router.get("/bakery", function(req, res) {
  grocery.selectAllFood(function(data) {
    var hbsObject = {
      groceries: data
    };
    console.log(hbsObject);
    res.render("bakery", hbsObject);
  });
});

router.get("/frozen", function(req, res) {
  grocery.selectAllFood(function(data) {
    var hbsObject = {
      groceries: data
    };
    console.log(hbsObject);
    res.render("frozen", hbsObject);
  });
});

module.exports = router;
