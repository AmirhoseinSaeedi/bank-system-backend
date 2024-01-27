const { connection } = require("../db/database");
const asyncHandler = require("express-async-handler");

exports.getAll = asyncHandler(async (req, res, next) => {
  connection.query("SELECT * FROM User", (error, results, fields) => {
    if (error) throw error;
    res.render('customer_list',{results});
  });
});

exports.get = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id + "  helllllo")
  connection.query(
    `SELECT * FROM User Where id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;
      res.render('customer_view',{results});
    }
  );
});
