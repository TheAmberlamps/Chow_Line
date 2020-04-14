var connection = require("./connection.js");

var orm = {
  selectAll: function (table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  insertOne: function (table, dest, itemID, tabla, cb) {
    console.log("insertOne ORM running:");
    console.log("table: " + table);
    console.log("destination: " + dest);
    console.log("item ID: " + itemID);
    console.log("tabla: " + tabla);
    var queryString =
      "INSERT INTO " +
      table +
      "(" +
      dest +
      ")" +
      "SELECT" +
      itemID +
      " FROM " +
      tabla +
      ";";
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
};

module.exports = orm;
