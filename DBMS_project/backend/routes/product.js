var express = require("express");
var router = express.Router();

/* GET product listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Product']
  res.send("In Product!!");
});

router.post("/getAllProducts", function (req, res, next) {
  // #swagger.tags = ['Unfinished']
});

router.post("/getProduct", function (req, res, next) {
  // #swagger.tags = ['Unfinished']
});

router.post("/addNewProduct", function (req, res, next) {
  // #swagger.tags = ['Unfinished']
});

router.post("/deleteProduct", function (req, res, next) {
  // #swagger.tags = ['Unfinished']
});

router.post("/updateAmount", function (req, res, next) {
  // #swagger.tags = ['Unfinished']
});

module.exports = router;
