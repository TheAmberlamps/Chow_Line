var express = require("express");

var router = express.Router();

// Import the model (grocery.js) to use its database functions.
var grocery = require("../models/grocery.js");

router.get("/", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    res.render("index", hbsObject);
  });
});

router.get("/produce", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    res.render("produce", hbsObject);
  });
});

router.get("/dairy", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    res.render("dairy", hbsObject);
  });
});

router.get("/meat&seafood", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    res.render("meat", hbsObject);
  });
});

router.get("/pantry", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    res.render("pantry", hbsObject);
  });
});

router.get("/bakery", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    res.render("bakery", hbsObject);
  });
});

router.get("/frozen", function (req, res) {
  grocery.selectAllFood(function (data) {
    var hbsObject = {
      groceries: data,
    };
    res.render("frozen", hbsObject);
  });
});

router.get("/cart", function (req, res) {
  var hbsObject = {
    purchases: null,
    groceries: null,
  };
  grocery.getCart(function (data) {
    hbsObject.purchases = data;
  });
  grocery.selectAllFood(function (data) {
    hbsObject.groceries = data;
    console.log(hbsObject.groceries[1].price);
    res.render("cart", hbsObject);
  });
});

router.post("/api/popCart", function (req, res) {
  grocery.popCart(req.body.id, req.body.amt, function (result) {
    res.json({ id: result.id });
  });
});

router.post("/api/updateGroceries", function (req, res) {
  grocery.updateGroc(req.body.amt, req.body.id, function (result) {
    res.json({ id: result.id });
  });
});

router.post("/api/updateCart", function (req, res) {
  grocery.updateCart(req.body.amt, req.body.id, function (result) {
    res.json({ id: result.id });
  });
});

router.post("/api/removeItem", function (req, res) {
  grocery.removeItem(req.body.id, function (result) {
    res.json({ id: result.id });
  });
});

router.post("/api/purge", function (req, res) {
  grocery.purgeCart(function (result) {
    res.json({ id: result.id });
  });
});

module.exports = router;
