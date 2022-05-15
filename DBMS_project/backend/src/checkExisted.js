const { mysqlPoolQuery } = require("./mysql");

const checkUserId = (userId, callback) => {
  mysqlPoolQuery(
    "SELECT * FROM user WHERE user_id = ?",
    userId,
    function (err, rows) {
      if (err) {
        callback(err, null);
      } else if (rows.length == 0) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    }
  );
};

const checkMaterialId = (materialId, callback) => {
  mysqlPoolQuery(
    "SELECT * FROM material WHERE material_id = ?",
    materialId,
    function (err, rows) {
      if (err) {
        callback(err, null);
      } else if (rows.length == 0) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    }
  );
};

const checkProductId = (productId, callback) => {
  mysqlPoolQuery(
    "SELECT * FROM product WHERE product_id = ?",
    productId,
    function (err, rows) {
      if (err) {
        callback(err, null);
      } else if (rows.length == 0) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    }
  );
};

module.exports = { checkUserId, checkMaterialId, checkProductId };
