let express = require("express");
let router = express.Router();
const transaction_controller = require("../controllers/transactionController");

router.get("/", transaction_controller.getAll);
router.get("/transfer/:id", transaction_controller.getTtansfer);
router.get("/withdrawal/:id", transaction_controller.getWithdrawal);

module.exports = router;
