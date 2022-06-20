var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

const { checkUserId, checkMaterialId } = require("../src/checkExisted");

/* GET material listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Material']
  res.send("In Material!!");
});

router.post("/getAllMaterials", async function (req, res, next) {
  /*
   #swagger.tags = ['Material']
   #swagger.responses[409] = {
    description: '使用者或原料不存在'
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
        "SELECT material_id AS materialId, material_name AS name, material_amount AS amount FROM material WHERE user_id = ?",
        userId
      );
      if (rows.length == 0) {
        res.status(200).json({ success: true, message: "尚無原料" });
      } else {
        res.status(200).json({ success: true, allMaterialInformation: rows });
      }
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/getMaterialHistory", async function (req, res, next) {
  /*
  #swagger.tags = ['Material']
  #swagger.response[409] = {
    description: '使用者或原料不存在',
  }
  #swagger.response[200] = {
    description: '取得成功',
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const materialId = req.body.materialId;
  try {
    const userExisted = await checkUserId(userId);
    const materialExisted = await checkMaterialId(materialId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!materialExisted) {
      res.status(409).json({ success: false, err: "原料不存在" });
    } else {
      let rows = await mysqlPoolQuery(
        "SELECT price, amount, cost, time FROM material_history WHERE user_id = ? AND material_id = ?",
        [userId, materialId]
      );
      res.status(200).json({ success: true, materialInformation: rows });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, err: err });
  }
});

// 取得原料name與id的dictionary
router.post("/getMaterialDict", async function (req, res, next) {
  /* 
  #swagger.tags = ['Material']
  #swagger.responses[200] = {
    description: '取得成功',
  }
  #swagger.responses[409] = {
    description: '使用者不存在',
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
        "SELECT material_name, material_id FROM material WHERE user_id = ? ",
        userId
      );
      let materialDict = {};
      for (let i = 0; i < rows.length; i++) {
        materialDict[rows[i].material_name] = rows[i].material_id;
      }
      res.status(200).json({ success: true, materialDict: materialDict });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/addNewMaterial", async function (req, res, next) {
  /*
  #swagger.tags = ['Material']
  #swagger.responses[201] = {
    description: '新增初始原料成功',
  }
  #swagger.responses[409] = {
    description: '原料名稱已存在',
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const materialName = req.body.materialName;
  const materialPrice = req.body.materialPrice || 0;
  const materialAmount = req.body.materialAmount || 0;
  const materialId = uuidv4();
  let insertMaterial = {
    material_id: materialId,
    material_name: materialName,
    material_amount: materialAmount,
    user_id: userId,
  };
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      // insert new material
      let rows = await mysqlPoolQuery(
        "SELECT material_name FROM material WHERE material_name = ? AND user_id = ?",
        [materialName, userId]
      );
      if (rows.length > 0) {
        res.status(409).json({ success: false, err: "原料名稱已存在" });
      } else {
        await mysqlPoolQuery("INSERT INTO material SET ?", insertMaterial);
        if (materialAmount > 0) {
          // 若有初始數量，則新增原料記錄
          let insertMaterialHistory = {
            mh_id: uuidv4(),
            user_id: userId,
            material_id: materialId,
            amount: materialAmount,
            price: materialPrice,
            cost: materialAmount * materialPrice,
            time: new Date(),
          };
          await mysqlPoolQuery(
            "INSERT INTO material_history SET ?",
            insertMaterialHistory
          );
        }
        res.status(201).json({ success: true, message: "新增初始原料成功" });
      }
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/deleteMaterial", async function (req, res, next) {
  /* 
  #swagger.tags = ['Material']
  #swagger.responses[200] = {
    description: '刪除原料成功',
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const materialId = req.body.materialId;
  try {
    const userExisted = await checkUserId(userId);
    const materialExisted = await checkMaterialId(materialId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!materialExisted) {
      res.status(409).json({ success: false, err: "原料不存在" });
    } else {
      await mysqlPoolQuery(
        "DELETE FROM material WHERE material_id = ? AND user_id = ?",
        [materialId, userId]
      );
      res.status(200).json({ success: true, message: "刪除原料成功" });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/updateAmount", async function (req, res, next) {
  /*
  #swagger.tags = ['Material']
  #swagger.responses[409] = {
    description: '使用者或原料不存在',
  }
  #swagger.responses[201] = {
    description: '更新原料成功',
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const materialId = req.body.materialId;
  const amountChange = req.body.amountChange;
  const price = req.body.price || 0;
  let insertMaterialHistory = {
    mh_id: uuidv4(),
    user_id: userId,
    material_id: materialId,
    amount: amountChange,
    price: price,
    cost: amountChange * price,
    time: new Date(),
  };
  try {
    const userExisted = await checkUserId(userId);
    const materialExisted = await checkMaterialId(materialId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!materialExisted) {
      res.status(409).json({ success: false, err: "原料不存在" });
    } else {
      await mysqlPoolQuery(
        "UPDATE material SET material_amount = material_amount + ? WHERE material_id = ? AND user_id = ?",
        [amountChange, materialId, userId]
      );
      await mysqlPoolQuery(
        "INSERT INTO material_history SET ?",
        insertMaterialHistory
      );
      res.status(201).json({ success: true, message: "更新原料成功" });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

module.exports = router;
