var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

const { checkUserId, checkProductId } = require("../src/checkExisted");

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
  checkUserId(userId, function (err, result) {
    if (err) {
      res.status(404).json({ success: false, err: err });
    } else if (result == false) {
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
  });
});

router.post("/getProduct", function (req, res, next) {
  /* 
  #swagger.tags = ['Product']
  #swagger.responses[409] = {
    description: '使用者或商品不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const productId = req.body.productId;
  checkUserId(userId, function (err, result) {
    if (err) {
      res.status(404).json({ success: false, err: err });
    } else if (result == false) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      checkProductId(productId, function (err, result) {
        if (err) {
          res.status(404).json({ success: false, err: err });
        } else if (result == false) {
          res.status(409).json({ success: false, err: "存貨不存在" });
        } else {
          mysqlPoolQuery(
            "SELECT product_id AS productId, product_name AS name, product_price AS price, product_amount AS amount FROM product WHERE user_id = ? AND product_id = ?",
            [userId, productId],
            function (err, rows) {
              if (err) {
                res.status(404).json({ success: false, err: err });
              } else {
                res
                  .status(200)
                  .json({ success: true, productInformation: rows });
              }
            }
          );
        }
      });
    }
  });
});

router.post("/addNewProduct", function (req, res, next) {
  // #swagger.tags = ['Unfinished']
});

router.post("/deleteProduct", function (req, res, next) {
  // #swagger.tags = ['Unfinished']
});

router.post("/updateAmount", function (req, res, next) {
  /* 
  #swagger.tags = ['Product']
  #swagger.responses[409] = {
    description: '使用者或商品不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const productId = req.body.productId;
  const amountChange = req.body.amountChange;
  checkUserId(userId, function (err, result) {
    if (err) {
      res.status(404).json({ success: false, err: err });
    } else if (result == false) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      checkProductId(productId, function (err, result) {
        if (err) {
          res.status(404).json({ success: false, err: err });
        } else if (result == false) {
          res.status(409).json({ success: false, err: "存貨不存在" });
        } else {
          mysqlPoolQuery(
            "UPDATE product SET product_amount = product_amount + ? WHERE product_id = ? AND user_id = ?",
            [amountChange, productId, userId],
            function (err, rows) {
              if (err) {
                res.status(404).json({ success: false, err: err });
              } else {
                res
                  .status(200)
                  .json({ success: true, message: "更新存貨成功" });
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
