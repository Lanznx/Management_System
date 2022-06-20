var express = require("express");
var router = express.Router();

const { v4: uuidv4 } = require("uuid");

const {
  checkUserId,
  checkEmployeeId,
  checkTimeblockId,
} = require("../src/checkExisted");

/* GET schedule listening. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Schedule']
  res.send("In Schedule!!");
});

router.post("/addNewEmployee", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const employeeName = req.body.employeeName;
  const employeeUnitSalary = req.body.employeeUnitSalary;
  const employeeId = uuidv4();
  let insertEmployee = {
    user_id: userId,
    employee_id: employeeId,
    employee_name: employeeName,
    employee_unit_salary: employeeUnitSalary,
  };
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      await mysqlPoolQuery("INSERT INTO employee SET ?", insertEmployee);
      res.status(200).json({
        success: true,
        message: "加入員工成功",
        employeeId: employeeId,
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/updateEmployee", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者與員工不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const employeeId = req.body.employeeId;
  const employeeName = req.body.employeeName;
  const employeeUnitSalary = req.body.employeeUnitSalary;
  try {
    const userExisted = await checkUserId(userId);
    const employeeExisted = await checkEmployeeId(employeeId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!employeeExisted) {
      res.status(409).json({ success: false, err: "員工不存在" });
    } else {
      await mysqlPoolQuery(
        "UPDATE employee SET employee_name = ?, employee_unit_salary = ? WHERE employee_id = ?",
        [employeeName, employeeUnitSalary, employeeId]
      );
      res.status(200).json({
        success: true,
        message: "更新員工成功",
        employeeId: employeeId,
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/deleteEmployee", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者與員工不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const employeeId = req.body.employeeId;
  try {
    const userExisted = await checkUserId(userId);
    const employeeExisted = await checkEmployeeId(employeeId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!employeeExisted) {
      res.status(409).json({ success: false, err: "員工不存在" });
    } else {
      await mysqlPoolQuery("DELETE FROM employee WHERE employee_id = ?", [
        employeeId,
      ]);
      res.status(200).json({
        success: true,
        message: "刪除員工成功",
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/getAllEmployee", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      const result = await mysqlPoolQuery(
        "SELECT employee_id AS employeeId, employee_name AS employeeName, employee_unit_salary AS employeeUnitSalary \
        FROM employee WHERE user_id = ?",
        [userId]
      );
      for (let i = 0; i < result.length; i++) {
        let employeeId = result[i].employeeId;
        // calculate working hours per month
        let workingHours = await mysqlPoolQuery(
          "SELECT SUM(end_time - start_time) AS workingHours \
          FROM timeblock WHERE employee_id = ? AND MONTH(start_time) = MONTH(CURRENT_DATE())",
          employeeId
        );
        let hour = Math.floor(workingHours[0].workingHours / 10000);
        let minute = ((workingHours[0].workingHours / 100) % 100) / 60;
        result[i].employeeWorkingHours = hour + minute;
        // calculate total salary
        let totalSalary =
          result[i].employeeWorkingHours * result[i].employeeUnitSalary;
        result[i].employeeTotalSalary = totalSalary;
      }
      res.status(200).json({ success: true, result: result });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/addNewTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者與員工不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const employeeId = req.body.employeeId;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const timeblockId = uuidv4();
  let insertTimeblock = {
    user_id: userId,
    employee_id: employeeId,
    timeblock_id: timeblockId,
    start_time: startTime,
    end_time: endTime,
  };
  try {
    const userExisted = await checkUserId(userId);
    const employeeExisted = await checkEmployeeId(employeeId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!employeeExisted) {
      res.status(409).json({ success: false, err: "員工不存在" });
    } else {
      await mysqlPoolQuery("INSERT INTO timeblock SET ?", insertTimeblock);
      res.status(200).json({
        success: true,
        message: "加入時段成功",
        timeblockId: timeblockId,
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/updateTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者與員工不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const employeeId = req.body.employeeId;
  const timeblockId = req.body.timeblockId;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  try {
    const userExisted = await checkUserId(userId);
    const employeeExisted = await checkEmployeeId(employeeId, userId);
    const timeblockExisted = await checkTimeblockId(timeblockId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!employeeExisted) {
      res.status(409).json({ success: false, err: "員工不存在" });
    } else if (!timeblockExisted) {
      res.status(409).json({ success: false, err: "時段不存在" });
    } else {
      await mysqlPoolQuery(
        "UPDATE timeblock SET start_time = ?, end_time = ? WHERE timeblock_id = ?",
        [startTime, endTime, timeblockId]
      );
      res.status(200).json({
        success: true,
        message: "更新時段成功",
        timeblockId: timeblockId,
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/deleteTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者或時段不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  const employeeId = req.body.employeeId;
  const timeblockId = req.body.timeblockId;
  try {
    const userExisted = await checkUserId(userId);
    const timeblockExisted = await checkTimeblockId(timeblockId, userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else if (!timeblockExisted) {
      res.status(409).json({ success: false, err: "時段不存在" });
    } else {
      await mysqlPoolQuery(
        "DELETE FROM timeblock WHERE timeblock_id = ?",
        timeblockId
      );
      res.status(200).json({
        success: true,
        message: "刪除時段成功",
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

router.post("/getAllTimeblock", async function (req, res, next) {
  /*
  #swagger.tags = ['Schedule']
  #swagger.responses[409] = {
    description: '使用者不存在'
  }
  */
  const mysqlPoolQuery = req.pool;
  const userId = req.body.userId;
  try {
    const userExisted = await checkUserId(userId);
    if (!userExisted) {
      res.status(409).json({ success: false, err: "使用者不存在" });
    } else {
      let result = await mysqlPoolQuery(
        "SELECT t.timeblock_id AS timeblockId, e.employee_id AS employeeId, e.employee_name AS employeeName, \
        t.start_time AS startTime, t.end_time AS endTime\
        FROM timeblock AS t, employee AS e \
        WHERE t.employee_id = e.employee_id AND t.user_id = ?",
        userId
      );
      res.status(200).json({ success: true, result: result });
    }
  } catch (err) {
    res.status(404).json({ success: false, err: err });
  }
});

module.exports = router;
