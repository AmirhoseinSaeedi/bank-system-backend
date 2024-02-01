const { connection } = require("../db/database");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const nationalId = req.body.nationalId;
  const userName = req.body.userName;
  const password = req.body.password;

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
                          VALUES ('${firstName}', '${lastName}', '${userName}', '${password}', '${phoneNumber}', '${nationalId}', 0 )`;
  await getDataAsync(INSERTQuery);
  console.log("here");
  res.redirect(`/`);
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
