var connection = require("./connection.js");

var orm = {
  selectAll: function (table, cb) {
    console.log("selectAll ORM model running");
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  insertToCart: function (itemID, amt, cb) {
    console.log("insertToCart ORM model running");
    console.log("item ID: " + itemID);
    console.log("amount: " + amt);
    var queryString =
      "INSERT INTO cart (grocery_id, amt) VALUES (" +
      itemID +
      ", " +
      amt +
      ");";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  updateGroc: function (amt, id, cb) {
    console.log("updateGroc ORM model running");
    console.log("amount: " + amt);
    console.log("id: " + id);
    var queryString =
      "UPDATE groceries SET inventory =" + amt + " WHERE id=" + id + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  updateCart: function (amt, id, cb) {
    console.log("updateCart ORM model running");
    console.log("amount:" + amt);
    console.log("id:" + id);
    var queryString =
      "UPDATE cart SET inventory=" + amt + "WHERE id=" + id + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  emptyCart: function (cb) {
    console.log("Emptying cart");
    var queryString = "TRUNCATE TABLE cart";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
};

module.exports = orm;
