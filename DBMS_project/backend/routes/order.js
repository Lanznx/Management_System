var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

const { checkUserId, checkProductId } = require("../src/checkExisted");

/* GET order listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Order']
  res.send("In Order!!");
});

router.post("/getTagDict", async function (req, res, next) {
  /*
  #swagger.tags = ['Order']
  #swagger.responses[409] = {
    description: '使用者不存在'
  }
  #swagger.responses[200] = {
    description: '取得成功',
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
        "SELECT tag_id AS tagId, tag_name AS tagName FROM tag WHERE user_id = ?",
        userId
      );
      let tagDict = {};
      for (let i = 0; i < rows.length; i++) {
        tagDict[rows[i].tagId] = rows[i].tagName;
      }
      res.status(200).json({ success: true, tagDict: tagDict });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/addNewTag", async function (req, res, next) {
  /*
  #swagger.tags = ['Order']
  #swagger.responses[409] = {
    description: '使用者不存在或標籤已存在'
  }
  #swagger.responses[200] = {
    description: '取得成功',
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const tagName = req.body.tagName;
  const tagId = uuidv4();
  let insertTag = {
    tag_id: tagId,
    tag_name: tagName,
    user_id: userId,
  };
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      // insert new tag
      let rows = await mysqlPoolQuery(
        "SELECT tag_name FROM tag WHERE tag_name = ? AND user_id = ?",
        [tagName, userId]
      );
      if (rows.length > 0) {
        res.status(409).json({ success: false, err: "標籤名稱已存在" });
      } else {
        await mysqlPoolQuery("INSERT INTO tag SET ?", insertTag);
        res.status(201).json({ success: true, message: "新增標籤成功" });
      }
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/addNewOrder", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

router.post("/getAllOrders", async function (req, res, next) {
  /*
  #swagger.tags = ['Unfinished']
  */
});

module.exports = router;
