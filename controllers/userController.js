const { connection } = require("../db/database");
const asyncHandler = require("express-async-handler");

exports.getAll = asyncHandler(async (req, res, next) => {
  connection.query("SELECT * FROM user", (error, results, fields) => {
    if (error) throw error;
    res.render("customer_list", { results });
  });
});

exports.get = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id + "  helllllo");
  connection.query(
    `SELECT * FROM user Where id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;
      res.render("customer_view", { results });
    }
  );
});

exports.login = asyncHandler(async (req, res, next) => {
  const userName = req.body.username;
  const password = req.body.password;

  var user = connection.query(
    `SELECT * FROM user where username='${userName}' AND password='${password}'`,
    (error, results, fields) => {
      if (error) throw error;
      if (results[0].isAdmin == 1) {
        res.render("admin");
      }
    }
  );
});
