const { connection } = require("../db/database");
const asyncHandler = require("express-async-handler");

exports.getAll = asyncHandler(async (req, res, next) => {
  connection.query("SELECT * FROM user", (error, results, fields) => {
    if (error) throw error;
    // res.send(results);
    res.render("customer_list", { results });
  });
});

exports.get = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  // console.log(id + "  helllllo");
  const userQuery = `SELECT * FROM user Where id = ${id}`;
  const results = await getDataAsync(userQuery);
  // res.send(results);
  res.render("customer_view", { results });
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

exports.detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const userDataQuery = `SELECT * FROM user Where id = ${id}`;
  const userData = await getDataAsync(userDataQuery);

  const transferQuery = `SELECT t.id , t.amount, t.date, t.status, u.firstName AS receiver_firstName, u.lastName AS receiver_lastName
                        FROM transfer t
                        JOIN user u ON t.receiver = u.id
                        WHERE t.sender = ${id}`;
  const transferData = await getDataAsync(transferQuery);

  const depositQuery = `SELECT t.id , t.amount, t.date, t.status, u.firstName AS sender_firstName, u.lastName AS sender_lastName
                        FROM transfer t
                        JOIN user u ON t.sender = u.id
                        WHERE t.receiver = ${id}`;
  const depositData = await getDataAsync(depositQuery);

  const withdrawalQuery = `SELECT w.id , w.amount, w.date_time, w.status, w.acceptorcode
                            FROM withdrawal w
                            WHERE w.userId = ${id}`;
  const withdrawalData = await getDataAsync(withdrawalQuery);

  const response = {
    userData: userData[0],
    transferData: transferData,
    depositData: depositData,
    withdrawalData: withdrawalData,
  };
  res.send(response);
});

exports.update = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const nationalId = req.body.nationalId;

  const updateQuery = `UPDATE user
                        SET
                          firstName = '${firstName}',
                          lastName = '${lastName}',
                          phoneNumber = '${phoneNumber}',
                          nationalId = '${nationalId}'
                        WHERE id = ${id};`;
  await getDataAsync(updateQuery);

  res.redirect(`/user/get/${id}`);
});

// in api ro vqti call mikni k user roo button create Customer click mikne
exports.createUser = asyncHandler(async (req, res, next) => {
  res.send({ hello: "get create" });
});

exports.create = asyncHandler(async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const nationalId = req.body.nationalId;
  const userName = req.body.userName;
  const password = req.body.password;
  const isAdimn = req.body.isAdmin;

  const error = [];

  const duplicateUserName = `SELECT * FROM user where username='${userName}'`;
  const duplicateUserNameData = await getDataAsync(duplicateUserName);

  const duplicateNationalId = `SELECT * FROM user where nationalId='${nationalId}'`;
  const duplicateNationalIdData = await getDataAsync(duplicateNationalId);

  if (duplicateUserNameData.length > 0) {
    error.push("Please Enter another User Name");
  }
  if (duplicateNationalIdData.length > 0) {
    error.push("some one else is in database with this national Id");
  }
  if (error.length > 0) {
    res.send(error);
    // dobare b safhe createUser bar migrde v bayad error ro nshon bde
  }

  const INSERTQuery = ` INSERT user (firstname, lastname, username, password, phoneNumber, NationalId, isAdmin)
                          VALUES ('${firstName}', '${lastName}', '${userName}', '${password}', '${phoneNumber}', '${nationalId}', '${isAdimn}')`;
  await getDataAsync(INSERTQuery);

  res.redirect(`/user/getAll`);
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
