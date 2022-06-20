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
      let rows = await mysqlPoolQuery(
        "SELECT product_id AS productId, product_name AS name, product_price AS price, product_amount AS amount FROM product WHERE user_id = ?",
        userId
      );
      if (rows.length == 0) {
        res.status(200).json({ success: true, message: "尚無商品" });
      } else {
        let allProductInformation = [];
        for (let i = 0; i < rows.length; i++) {
          let productId = rows[i].productId;
          let materialRows = await mysqlPoolQuery(
            "SELECT m.material_id AS materialId, m.material_name AS materialName \
            FROM material AS m, product_material AS pm \
            WHERE m.material_id = pm.material_id AND product_id = ?",
            productId
          );
          allProductInformation.push({
            productId: productId,
            name: rows[i].name,
            price: rows[i].price,
            amount: rows[i].amount,
            materials: materialRows,
          });
        }
        res.status(200).json({
          success: true,
          allProductInformation: allProductInformation,
        });
      }
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
    const productExisted = await checkProductId(productId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!productExisted) {
      res.status(409).json({ success: false, err: "存貨不存在" });
    } else {
      let rows = await mysqlPoolQuery(
        "SELECT product_id AS productId, product_name AS name, product_price AS price, product_amount AS amount FROM product WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );
      let materialRows = await mysqlPoolQuery(
        "SELECT m.material_id AS materialId, m.material_name AS materialName \
        FROM material AS m, product_material AS pm \
        WHERE m.material_id = pm.material_id AND product_id = ?",
        productId
      );
      res.status(200).json({
        success: true,
        productInformation: {
          productId: rows[0].productId,
          name: rows[0].name,
          price: rows[0].price,
          amount: rows[0].amount,
          materials: materialRows,
        },
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/addNewProduct", async function (req, res, next) {
  /* 
  #swagger.tags = ['Product']
  #swagger.responses[409] = {
    description: '使用者或原料不存在、商品已存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productAmount = req.body.productAmount || 0;
  const materialIds = req.body.materialIds;
  const productId = uuidv4();
  let insertProduct = {
    product_id: productId,
    product_name: productName,
    product_price: productPrice,
    product_amount: productAmount,
    user_id: userId,
  };
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      let rows = await mysqlPoolQuery(
        "SELECT product_name FROM product WHERE product_name = ? AND user_id = ?",
        [productName, userId]
      );
      if (rows.length > 0) {
        res.status(409).json({ success: false, err: "存貨名稱已存在" });
      } else {
        await mysqlPoolQuery("INSERT INTO product SET ?", insertProduct);
        let allMaterialExisted = true;
        for (let i = 0; i < materialIds.length; i++) {
          console.log(materialIds[i]);
          let materialExisted = await checkMaterialId(materialIds[i], userId);
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
          for (let i = 0; i < materialIds.length; i++) {
            let insertProductMaterial = {
              product_id: productId,
              material_id: materialIds[i],
            };
            await mysqlPoolQuery(
              "INSERT INTO product_material SET ?",
              insertProductMaterial
            );
          }
          res.status(200).json({
            success: true,
            message: "新增初始存貨成功",
          });
        }
      }
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
    const productExisted = await checkProductId(productId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!productExisted) {
      res.status(409).json({ success: false, err: "存貨不存在" });
    } else {
      await mysqlPoolQuery(
        "DELETE FROM product WHERE product_id = ? AND user_id = ?",
        [productId, userId]
      );
      res.status(200).json({ success: true, message: "刪除存貨成功" });
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
    const productExisted = await checkProductId(productId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!productExisted) {
      res.status(409).json({ success: false, err: "存貨不存在" });
    } else {
      await mysqlPoolQuery(
        "UPDATE product SET product_amount = product_amount + ? WHERE product_id = ? AND user_id = ?",
        [amountChange, productId, userId]
      );
      res.status(200).json({ success: true, message: "更新存貨成功" });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

module.exports = router;
