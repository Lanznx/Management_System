var express = require("express");
var router = express.Router();

/* GET product listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Product']
  res.send("In Product!!");
});

router.post("/getAllProducts", function (req, res, next) {
  // #swagger.tags = ['Product']
});

module.exports = router;
