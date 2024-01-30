let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let notesRouter = require("./routes/notes");
let userRouter = require("./routes/user");
let indexRouter = require("./routes/index");
let transactionRouter = require("./routes/transaction");
const { connectToDatabase, connection } = require("./db/database");
let app = express();
connectToDatabase();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("css"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.get("/user/style.css", (req, res) => res.send({ hello: "hello" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/note", notesRouter);
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use("/", indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message);
});

module.exports = app;
