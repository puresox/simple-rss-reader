const mysql = require('../mysql');

module.exports = {
  create: async (username, password) => {
    const sqlString = 'insert into user(username, password) values(?, ?)';
    const values = [username, password];
    await mysql(sqlString, values);
  },

  find: async (username) => {
    const sqlString = 'select * from user where username = ?';
    const values = [username];
    await mysql(sqlString, values);
  },
};
