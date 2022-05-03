var express = require("express");
const mysql = require("mysql");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("In User!!");
});

module.exports = router;
