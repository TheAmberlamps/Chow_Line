var orm = require("../config/orm.js");

var grocery_users = {
  selectAll: function(cb) {
    orm.selectAll("users", function(res) {
      cb(res);
    });
  }
};

module.exports = grocery_users;
