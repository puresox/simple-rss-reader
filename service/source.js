const mysql = require('../mysql');

module.exports = {
  create: async (name, description, rssLink, link) => {
    const sqlString = 'insert into source(name, description, rss, link) values(?, ?, ?, ?)';
    const values = [name, description, rssLink, link];
    const { results } = await mysql(sqlString, values);
    return results;
  },

  find: async () => {
    const sqlString = 'select * from source';
    const values = [];
    const { results: sources } = await mysql(sqlString, values);
    return sources;
  },

  findById: async (id) => {
    const sqlString = 'select * from source where id = ?';
    const values = [id];
    const { results: sources } = await mysql(sqlString, values);
    return sources[0];
  },

  findByRss: async (rss) => {
    const sqlString = 'select * from source where rss = ?';
    const values = [rss];
    const { results: sources } = await mysql(sqlString, values);
    return sources[0];
  },

  remove: async (id) => {
    const sqlString = 'delete from source where id = ?';
    const values = [id];
    await mysql(sqlString, values);
  },
};
