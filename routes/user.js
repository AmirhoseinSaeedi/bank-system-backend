let express = require("express");
let router = express.Router();
const user_controller = require("../controllers/userController");

router.get("/getAll", user_controller.getAll);

router.get("/get/:id", user_controller.get);

router.post("/login", user_controller.login);

router.get("/:id/detail", user_controller.detail);

router.post("/update/:id", user_controller.update);

router.get("/createUser", user_controller.createUser);

router.post("/create", user_controller.create);

router.delete("/delete/:id", user_controller.delete);

module.exports = router;
