let express = require("express");
let router = express.Router();
const transaction_controller = require("../controllers/transactionController");

router.get("/", transaction_controller.getAll);
router.get("/transfer/get/:id", transaction_controller.getTtansfer);
router.get("/withdrawal/get/:id", transaction_controller.getWithdrawal);
router.get("/transfer/createPage", transaction_controller.createTransferPage);
router.post("/transfer/create", transaction_controller.createTransfer);
module.exports = router;
