let express = require("express");
let router = express.Router();
const transaction_controller = require("../controllers/transactionController");

router.get("/", transaction_controller.getAll);
router.get("/transfer/get/:id", transaction_controller.getTtansfer);
router.get("/withdrawal/get/:id", transaction_controller.getWithdrawal);
router.get("/transfer/createPage", transaction_controller.createTransferPage);
router.post("/transfer/create", transaction_controller.createTransfer);
router.get(
  "/withdrawal/createPage",
  transaction_controller.createWithdrawalPage
);
router.post("/withdrawal/create", transaction_controller.createWithdrawal);
router.put("/transfer/update", transaction_controller.editTransferStatus);
router.put("/withdrawal/update", transaction_controller.editWithdrawalStatus);
module.exports = router;
