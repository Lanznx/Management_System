var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

/* GET material listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Material']
  res.send("In Material!!");
});

router.post("/getAllMaterials", function (req, res, next) {
  // #swagger.tags = ['Material']
});

router.post("/getMaterialHistory", function (req, res, next) {
  // #swagger.tags = ['Material']
});

router.post("/newMaterial", function (req, res, next) {
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
  // insert new material
  mysqlPoolQuery(
    "SELECT material_name FROM material WHERE material_name = ?",
    materialName,
    function (err, rows) {
      if (rows.length > 0) {
        res.status(409).json({ success: false, err: "原料名稱已存在" });
      } else {
        mysqlPoolQuery(
          "INSERT INTO material SET ?",
          insertMaterial,
          function (err, rows) {
            if (err) {
              res.status(404).json({ success: false, err: err });
            } else if (materialAmount > 0) {
              // 若有初始數量，則新增原料記錄
              let insertMaterialHistory = {
                mh_id: uuidv4(),
                user_id: userId,
                material_id: materialId,
                amount: materialAmount,
                cost: materialAmount * materialPrice,
                time: new Date(Date.now()),
              };
              mysqlPoolQuery(
                "INSERT INTO material_history SET ?",
                insertMaterialHistory,
                function (err, rows) {
                  if (err) {
                    res.status(404).json({ success: false, err: err });
                  } else {
                    res
                      .status(201)
                      .json({ success: true, message: "新增初始原料成功" });
                  }
                }
              );
            } else {
              res
                .status(201)
                .json({ success: true, message: "新增初始原料成功" });
            }
          }
        );
      }
    }
  );
});

router.post("/deleteMaterial", function (req, res, next) {
  // #swagger.tags = ['Material']
});

router.post("/updateAmount", function (req, res, next) {
  // #swagger.tags = ['Material']
});

module.exports = router;
