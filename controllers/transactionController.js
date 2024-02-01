const { connection } = require("../db/database");
const asyncHandler = require("express-async-handler");

exports.getAll = asyncHandler(async (req, res, next) => {
  const transactionQuery = `SELECT t.id , t.amount, t.date, t.status, u1.firstName AS sender_firstName,
                            u1.lastName AS sender_lastName,u2.firstName AS receiver_firstName,u2.lastName AS receiver_lastName
                          FROM transfer t
                          JOIN user u1 ON t.sender = u1.id
                          JOIN user u2 ON t.receiver = u2.id`;
  const transactionData = await getDataAsync(transactionQuery);

  const WithdrawalQuery = `SELECT w.id , w.amount, w.status, w.date_time, w.acceptorcode, u.firstName as user_firstName, 
                              u.lastName as user_lastName
                            FROM withdrawal w
                            JOIN user u ON w.userId = u.id`;
  const withdrawalData = await getDataAsync(WithdrawalQuery);

  const response = {
    transactionData: transactionData,
    withdrawalData: withdrawalData,
  };
  // res.send(response);
  res.render("all_transactions", { response });
});

exports.getTtansfer = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const transactionQuery = `SELECT t.amount, t.date, t.status, u1.firstName AS sender_firstName,
                            u1.lastName AS sender_lastName,u2.firstName AS receiver_firstName,u2.lastName AS receiver_lastName
                          FROM transfer t
                          JOIN user u1 ON t.sender = u1.id
                          JOIN user u2 ON t.receiver = u2.id
                          where t.id = ${id}`;
  const transactionData = await getDataAsync(transactionQuery);
  res.send(transactionData[0]);
});

exports.getWithdrawal = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const withdrawalQuery = `SELECT w.amount, w.status, w.date_time, w.acceptorcode, u.firstName as user_firstName, 
                            u.lastName as user_lastName
                            FROM withdrawal w
                            JOIN user u ON w.userId = u.id
                            where w.id=${id}`;
  const withdrawalData = await getDataAsync(withdrawalQuery);
  const data = withdrawalData;
  res.render("transaction_details", { data });
});

exports.createTransferPage = asyncHandler(async (req, res, next) => {
  // render krdn safhe create transfer
  // res.render('transaction_details',{data});
  res.send({ hello: "hello" });
});

exports.createTransfer = asyncHandler(async (req, res, next) => {
  const senderUserName = req.body.senderUserName;
  const reciverUserName = req.body.reciverUserName;
  const amount = req.body.amount;

  const senderIdQuery = `SELECT id FROM user where username='${senderUserName}'`;
  const senderId = await getDataAsync(senderIdQuery);

  const reciverIdQuery = `SELECT id FROM user where username='${reciverUserName}'`;
  const receiverId = await getDataAsync(reciverIdQuery);
  console.log(receiverId);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const createTransferQuery = `INSERT transfer (amount, date, sender, receiver, status) 
                                  values(${amount}, '${formattedDate}', ${senderId[0].id}, ${receiverId[0].id}, 'processing' )`;
  await getDataAsync(createTransferQuery);

  res.redirect("/transaction");
});

exports.createWithdrawalPage = asyncHandler(async (req, res, next) => {
  // render krdn safhe create transfer
  // res.render('transaction_details',{data});
  res.send({ hello: "hello" });
});

exports.createWithdrawal = asyncHandler(async (req, res, next) => {
  const cashierUserName = req.body.cashierUserName;
  const acceptorcode = req.body.acceptorcode;
  const amount = req.body.amount;

  const cashierIdQuery = `SELECT id FROM user where username='${cashierUserName}'`;
  const cashieId = await getDataAsync(cashierIdQuery);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const createWithdrawalrQuery = `INSERT withdrawal (amount, date_time, userId, acceptorcode , status) 
                                  values(${amount}, '${formattedDate}', ${cashieId[0].id}, '${acceptorcode}', 'processing' )`;
  await getDataAsync(createWithdrawalrQuery);

  res.redirect("/transaction");
});

exports.editTransferStatus = asyncHandler(async (req, res, next) => {
  const id = req.body.id;
  const status = req.body.status;

  const updateTransferQuery = `Update transfer
                                Set status='${status}' WHERE id = ${id}`;
  await getDataAsync(updateTransferQuery);
  res.redirect("/transaction");
});

exports.editWithdrawalStatus = asyncHandler(async (req, res, next) => {
  const id = req.body.id;
  const status = req.body.status;

  const updateWithdrawalQuery = `Update Withdrawal
                                Set status='${status}' WHERE id = ${id}`;
  await getDataAsync(updateWithdrawalQuery);
  res.redirect("/transaction");
});
function getDataAsync(userDataQuery) {
  return new Promise((resolve, reject) => {
    connection.query(userDataQuery, (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        resolve(results);
      }
    });
  });
}
