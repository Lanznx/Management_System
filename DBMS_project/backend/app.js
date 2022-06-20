var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

require("dotenv").config();

const { mysqlPoolQuery } = require("./src/mysql");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var materialRouter = require("./routes/material");
var productRouter = require("./routes/product");
var orderRouter = require("./routes/order");
var scheduleRouter = require("./routes/schedule");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// swagger
const basicAuth = require("express-basic-auth");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

/* swagger admin */
adminName = process.env.ADMIN_NAME;
adminPassword = process.env.ADMIN_PASSWORD;

app.use(
  "/api-doc",
  basicAuth({
    users: {
      [adminName]: adminPassword,
    },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  req.pool = mysqlPoolQuery;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/material", materialRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/schedule", scheduleRouter);

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
  res.render("error");
});

module.exports = app;
