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

  findByid: async (id) => {
    const sqlString = 'select * from user where id = ?';
    const values = [id];
    const { results: [user] } = await mysql(sqlString, values);
    return user;
  },

  updatePassword: async (id, password) => {
    const sqlString = 'update user set password = ? where id = ?';
    const values = [password, id];
    await mysql(sqlString, values);
  },
};
