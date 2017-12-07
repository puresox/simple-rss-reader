const mysql = require('../mysql');

module.exports = {
  create: async (name, rss, link) => {
    const sqlString = 'insert into source(name, rss, link) values(?, ?, ?)';
    const values = [name, rss, link];
    await mysql(sqlString, values);
  },

  find: async () => {
    const sqlString = 'select * from source';
    const values = [];
    await mysql(sqlString, values);
  },

  remove: async (id) => {
    const sqlString = 'delete from source where id = ?';
    const values = [id];
    await mysql(sqlString, values);
  },
};
