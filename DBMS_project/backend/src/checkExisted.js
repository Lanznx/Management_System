const { mysqlPoolQuery } = require("./mysql");

const checkUserId = (userId) => {
  return new Promise((resolve, reject) => {
    mysqlPoolQuery(
      "SELECT * FROM user WHERE user_id = ?",
      userId,
      function (err, rows) {
        if (err) {
          reject(err);
        } else if (rows.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const checkMaterialId = (materialId) => {
  return new Promise((resolve, reject) => {
    mysqlPoolQuery(
      "SELECT * FROM material WHERE material_id = ?",
      materialId,
      function (err, rows) {
        if (err) {
          reject(err);
        } else if (rows.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const checkProductId = (productId) => {
  return new Promise((resolve, reject) => {
    mysqlPoolQuery(
      "SELECT * FROM product WHERE product_id = ?",
      productId,
      function (err, rows) {
        if (err) {
          reject(err);
        } else if (rows.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

module.exports = { checkUserId, checkMaterialId, checkProductId };
