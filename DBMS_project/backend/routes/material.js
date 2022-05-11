var express = require("express");
var router = express.Router();

/* GET material listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Material']
  res.send("In Material!!");
});

router.post("/getAllMaterials", function (req, res, next) {
  // #swagger.tags = ['Material']
});

module.exports = router;
