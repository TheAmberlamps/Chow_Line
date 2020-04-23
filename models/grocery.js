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
  popCart: function (id, amt, cb) {
    orm.insertOne(id, amt, function (res) {
      cb(res);
    });
  },
  updateGroc: function (amt, id, cb) {
    orm.updateOne(amt, id, function (res) {
      cb(res);
    });
  },
  getPrice: function (id, cb) {
    orm.getPrice(id, function (res) {
      cb(res);
    });
  },
};

module.exports = grocery;
