let connection = require("./connection.js");

let orm = {
  selectAll: function (table, cb) {
    let queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  insertToCart: function (itemID, amt, cb) {
    console.log("insertToCart ORM model running");
    let queryString =
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
    let queryString =
      "UPDATE groceries SET inventory =" + amt + " WHERE id=" + id + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  updateCart: function (amt, id, cb) {
    console.log("updateCart ORM model running");
    let queryString =
      "UPDATE cart SET amt=" + amt + " WHERE grocery_id=" + id + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  removeItem: function (id, cb) {
    console.log("removeItem ORM model running");
    let queryString = "DELETE FROM cart WHERE grocery_id=" + id + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  emptyCart: function (cb) {
    console.log("Emptying cart");
    let queryString = "TRUNCATE TABLE cart";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
};

module.exports = orm;
