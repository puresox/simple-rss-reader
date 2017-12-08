const mysql = require('../mysql');

module.exports = {
  create: async (username, password) => {
    const sqlString = 'insert into user(username, password) values(?, ?)';
    const values = [username, password];
    const { results } = await mysql(sqlString, values);
    return results;
  },

  find: async (username) => {
    const sqlString = 'select * from user where username = ?';
    const values = [username];
    const { results: users } = await mysql(sqlString, values);
    return users;
  },
};
