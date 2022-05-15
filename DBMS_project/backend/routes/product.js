var express = require("express");
var router = express.Router();

/* GET product listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Product']
  res.send("In Product!!");
});

router.post("/getAllProducts", function (req, res, next) {
  /*
   #swagger.tags = ['Product']
   #swagger.responses[409] = {
    description: '使用者或商品不存在'
   }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  mysqlPoolQuery(
    "SELECT * FROM user WHERE user_id = ?",
    userId,
    function (err, rows) {
      if (err) {
        res.status(404).json({ success: false, err: err });
      } else if (rows.length == 0) {
        res.status(409).json({ success: false, err: "使用者不存在" });
      } else {
        mysqlPoolQuery(
          "SELECT product_id AS productId, product_name AS name, product_price AS price, product_amount AS amount FROM product WHERE user_id = ?",
          userId,
          function (err, rows) {
            if (err) {
              res.status(404).json({ success: false, err: err });
            } else {
              if (rows.length == 0) {
                res.status(409).json({ success: false, err: "尚無商品" });
              } else {
                res
                  .status(200)
                  .json({ success: true, allProductInformation: rows });
              }
            }
          }
        );
      }
    }
  );
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
