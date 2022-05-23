var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

const {
  checkUserId,
  checkProductId,
  checkMaterialId,
} = require("../src/checkExisted");

/* GET product listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Product']
  res.send("In Product!!");
});

router.post("/getAllProducts", async function (req, res, next) {
  /*
   #swagger.tags = ['Product']
   #swagger.responses[409] = {
    description: '使用者或商品不存在'
   }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
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
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/getProduct", async function (req, res, next) {
  /* 
  #swagger.tags = ['Product']
  #swagger.responses[409] = {
    description: '使用者或商品不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const productId = req.body.productId;
  try {
    const userExisted = await checkUserId(userId);
    const productExisted = await checkProductId(productId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!productExisted) {
      res.status(409).json({ success: false, err: "存貨不存在" });
    } else {
      mysqlPoolQuery(
        "SELECT product_id AS productId, product_name AS name, product_price AS price, product_amount AS amount FROM product WHERE user_id = ? AND product_id = ?",
        [userId, productId],
        function (err, rows) {
          if (err) {
            res.status(404).json({ success: false, err: err });
          } else {
            res.status(200).json({ success: true, productInformation: rows });
          }
        }
      );
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/addNewProduct", async function (req, res, next) {
  // #swagger.tags = ['Unfinished']
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const amount = req.body.amount || 0;
  const materialId = req.body.materialId;
  const productId = uuidv4();
  let insertProduct = {
    product_id: productId,
    product_name: productName,
    product_price: productPrice,
    product_amount: amount,
    user_id: userId,
  };
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      mysqlPoolQuery(
        "SELECT product_name FROM product WHERE product_name = ?",
        productName,
        function (err, rows) {
          if (rows.length > 0) {
            res.status(409).json({ success: false, err: "存貨名稱已存在" });
          } else {
            mysqlPoolQuery(
              "INSERT INTO product SET ?",
              insertProduct,
              async function (err, rows) {
                if (err) {
                  res.status(404).json({ success: false, err: err });
                } else {
                  let allMaterialExisted = true;
                  for (let i = 0; i < materialId.length; i++) {
                    const materialExisted = await checkMaterialId(
                      materialId[i]
                    );
                    if (!materialExisted) {
                      allMaterialExisted = false;
                    }
                  }
                  if (!allMaterialExisted) {
                    res.status(409).json({
                      success: false,
                      err: "原料不存在",
                    });
                  } else {
                    for (let i = 0; i < materialId.length; i++) {
                      let insertProductMaterial = {
                        product_id: productId,
                        material_id: materialId[i],
                      };
                      mysqlPoolQuery(
                        "INSERT INTO product_material SET ?",
                        insertProductMaterial,
                        function (err, rows) {
                          if (err) {
                            res.status(404).json({ success: false, err: err });
                          } else {
                            res.status(200).json({
                              success: true,
                              message: "新增初始存貨成功",
                            });
                          }
                        }
                      );
                    }
                  }
                }
              }
            );
          }
        }
      );
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/deleteProduct", async function (req, res, next) {
  /*
  #swagger.tags = ['Product']
  #swagger.responses[409] = {
    description: '使用者或商品不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const productId = req.body.productId;
  try {
    const userExisted = await checkUserId(userId);
    const productExisted = await checkProductId(productId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!productExisted) {
      res.status(409).json({ success: false, err: "存貨不存在" });
    } else {
      mysqlPoolQuery(
        "DELETE FROM product WHERE product_id = ? AND user_id = ?",
        [productId, userId],
        function (err, rows) {
          if (err) {
            res.status(404).json({ success: false, err: err });
          } else {
            res.status(200).json({ success: true, message: "刪除存貨成功" });
          }
        }
      );
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/updateAmount", async function (req, res, next) {
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
  try {
    const userExisted = await checkUserId(userId);
    const productExisted = await checkProductId(productId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!productExisted) {
      res.status(409).json({ success: false, err: "存貨不存在" });
    } else {
      mysqlPoolQuery(
        "UPDATE product SET product_amount = product_amount + ? WHERE product_id = ? AND user_id = ?",
        [amountChange, productId, userId],
        function (err, rows) {
          if (err) {
            res.status(404).json({ success: false, err: err });
          } else {
            res.status(200).json({ success: true, message: "更新存貨成功" });
          }
        }
      );
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

module.exports = router;
