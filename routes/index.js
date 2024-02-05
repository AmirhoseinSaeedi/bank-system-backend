var express = require("express");
var router = express.Router();
const index_controller = require("../controllers/indexController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login");
});

router.get("/signin", function (req, res, next) {
  res.render("customer_signin");
});

router.post("/signin/create", index_controller.create);
module.exports = router;
