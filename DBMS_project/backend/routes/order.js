var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

const { checkUserId, checkProductId } = require("../src/checkExisted");

/* GET order listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Order']
  res.send("In Order!!");
});

router.post("/getTagDict", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/addNewTag", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/addNewOrder", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/getAllOrders", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

module.exports = router;
