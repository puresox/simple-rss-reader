const mysql = require('../mysql');

module.exports = {
  create: async (sourceid, title, pubDate, description, link) => {
    const sqlString =
      'insert into article (sourceid, title, pubDate, description, link) values (?, ?, ?, ?, ?)';
    const values = [sourceid, title, pubDate, description, link];
    const { results } = await mysql(sqlString, values);
    return results;
  },

  findByUser: async (userid) => {
    const sqlString =
      'select * from article where sourceid in (select sourceid from subscribe where userid = ?) order by pubDate desc';
    const values = [userid];
    const { results: articles } = await mysql(sqlString, values);
    return articles;
  },

  findBySource: async (sourceid) => {
    const sqlString = 'select * from article where sourceid = ? order by pubDate desc';
    const values = [sourceid];
    const { results: articles } = await mysql(sqlString, values);
    return articles;
  },

  findByTitle: async (userid, search) => {
    const sqlString =
      'select * from article where sourceid in (select sourceid from subscribe where userid = ?) and title like ? order by pubDate desc';
    const values = [userid, `%${search}%`];
    const { results: articles } = await mysql(sqlString, values);
    return articles;
  },

  findLatestBySource: async (sourceid) => {
    const sqlString = 'select * from article where sourceid = ? order by pubDate desc limit 1';
    const values = [sourceid];
    const { results: [article] } = await mysql(sqlString, values);
    return article;
  },
};
