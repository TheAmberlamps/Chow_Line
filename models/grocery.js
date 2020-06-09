var orm = require("../config/orm.js");

// OK, so the fact that this file isn't exported as a function means that sequelize is throwing a fit and the server won't initialize. The problem may be deeper than that but I won't be able to tell until that's sorted.

// Also, given their absence in Spartan Meet it looks as though I'm going to need to remove orm.js and connection.js. My MVC paradigm sincerely doesn't seem to want to play with sequelize, this may require some serious surgery.

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
  updateCart: function (amt, id, cb) {
    orm.updateCart(amt, id, function (res) {
      cb(res);
    });
  },
  removeItem: function (id, cb) {
    orm.removeItem(id, function (res) {
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
