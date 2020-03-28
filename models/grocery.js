var orm = require("../config/orm.js");

var grocery = {
  selectAllUsers: function(cb) {
    orm.selectAll("users", function(res) {
      cb(res);
    });
  },
  selectAllFood: function(cb) {
    orm.selectAll("groceries", function(res) {
      cb(res);
    });
  }
};

module.exports = grocery;
