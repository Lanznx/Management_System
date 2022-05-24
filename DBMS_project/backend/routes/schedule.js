var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

/* GET schedule listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Schedule']
  res.send("In Schedule!!");
});

router.post("/addNewEmployee", function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/updateEmployee", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/deleteEmployee", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/getAllEmployee", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/addNewTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/updateTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/deleteTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/getAllTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

module.exports = router;
