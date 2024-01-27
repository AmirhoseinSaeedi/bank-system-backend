let express = require("express");
let router = express.Router();
const user_controller = require("../controllers/userController");

router.get("/", user_controller.getAll);

router.get("/:id", user_controller.get);

router.post("/login", user_controller.login);
module.exports = router;
