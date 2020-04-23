var connection = require("./connection.js");

var orm = {
  selectAll: function (table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  getPrice: function (id, cb) {
    var queryString = "SELECT price FROM groceries WHERE id=" + id + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  insertOne: function (itemID, amt, cb) {
    console.log("insertOne ORM model running");
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
  updateOne: function (amt, id, cb) {
    console.log("updateOne ORM model running");
    console.log("amount: " + amt);
    console.log("id: " + id);
    var queryString =
      "UPDATE groceries SET inventory =" + amt + " WHERE id=" + id + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
};

module.exports = orm;
