const mysql = require("mysql");
const {
  DB_host,
  DB_port,
  DB_username,
  DB_password,
  DB_name,
} = require("./envVariables");

const DatabaseCredential = {
  host: DB_host,
  user: DB_username,
  password: DB_password,
  database: DB_name,
  port: DB_port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
let pool = mysql.createPool(DatabaseCredential);

const mysqlPoolQuery = async (sql, options) => {
  return new Promise((resolve, reject) => {
    // if options is not provided
    if (typeof options === "undefined") {
      options = [];
    }
    pool.getConnection(async function (err, conn) {
      if (err) {
        reject(err);
      } else {
        conn.query(sql, options, async function (err, result, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
        // connection 的釋放需要在此 release，而不能在 callback 中 release
        conn.release();
      }
    });
  });
};

module.exports = { mysqlPoolQuery };
