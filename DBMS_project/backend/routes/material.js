var express = require("express");
var router = express.Router();

/* GET material listening. */
router.get("/", function (req, res, next) {
  res.send("In Material!!");
});

router.post("/getAllMaterials", function (req, res, next) {});

module.exports = router;
