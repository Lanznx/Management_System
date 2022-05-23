const { mysqlPoolQuery } = require("./mysql");

const checkUserId = (userId) => {
  return new Promise((resolve, reject) => {
    mysqlPoolQuery("SELECT * FROM user WHERE user_id = ?", userId)
      .then((rows) => {
        if (rows.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const checkMaterialId = (materialId) => {
  return new Promise((resolve, reject) => {
    mysqlPoolQuery("SELECT * FROM material WHERE material_id = ?", materialId)
      .then((rows) => {
        if (rows.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const checkProductId = (productId) => {
  return new Promise((resolve, reject) => {
    mysqlPoolQuery("SELECT * FROM product WHERE product_id = ?", productId)
      .then((rows) => {
        if (rows.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { checkUserId, checkMaterialId, checkProductId };
