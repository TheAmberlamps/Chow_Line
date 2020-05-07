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
    orm.insertToCart(id, amt, function (res) {
      cb(res);
    });
  },
  updateGroc: function (amt, id, cb) {
    orm.updateGroc(amt, id, function (res) {
      cb(res);
    });
  },
  purgeCart: function (cb) {
    orm.emptyCart(function (res) {
      cb(res);
    });
  },
};

module.exports = grocery;
