var orm = require("../config/orm.js");

var grocery = {
  selectAllUsers: function (cb) {
    orm.selectAll("users", function (res) {
      cb(res);
    });
  },
  selectAllFood: function (cb) {
    orm.selectAll("groceries", function (res) {
      cb(res);
    });
  },
  getCart: function (cb) {
    orm.selectAll("cart", function (res) {
      cb(res);
    });
  },
  popCart: function (id, cb) {
    orm.insertOne("cart", "grocery_id", id, "groceries", function (res) {
      console.log("popCart running in models");
      cb(res);
    });
  },
};

module.exports = grocery;
