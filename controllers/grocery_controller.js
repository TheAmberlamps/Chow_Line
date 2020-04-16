var express = require("express");

var router = express.Router();

// Import the model (grocery.js) to use its database functions.
var grocery = require("../models/grocery.js");

router.get("/", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/produce", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    console.log(hbsObject);
    res.render("produce", hbsObject);
  });
});

router.get("/dairy", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    console.log(hbsObject);
    res.render("dairy", hbsObject);
  });
});

router.get("/meat&seafood", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    console.log(hbsObject);
    res.render("meat", hbsObject);
  });
});

router.get("/pantry", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    console.log(hbsObject);
    res.render("pantry", hbsObject);
  });
});

router.get("/bakery", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    console.log(hbsObject);
    res.render("bakery", hbsObject);
  });
});

router.get("/frozen", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    console.log(hbsObject);
    res.render("frozen", hbsObject);
  });
});

router.get("/cart", function (req, res) {
  grocery.getCart(function (data) {
    var hbsObject = {
      purchases: data,
    };
    console.log(hbsObject);
    res.render("cart", hbsObject);
  });
});

router.post("/api/groceries", function (req, res) {
  console.log("router.post running in controllers");
  console.log("request: " + req.body);
  console.log("result: " + res);
  grocery.popCart(req.body.id, req.body.amt, function (result) {
    console.log("result: " + result);
    res.json({ id: result.id });
  });
});

module.exports = router;
