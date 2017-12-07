const mysql = require('mysql');
const {
  mysql: {
    connectionLimit, host, user, password, database,
  },
} = require('./config/config');

const pool = mysql.createPool({
  connectionLimit,
  host,
  user,
  password,
  database,
});

module.exports = (sqlString = '', values = []) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(sqlString, values, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) {
          reject(error);
        } else {
          resolve({ results, fields });
        }
      });
    });
  });
