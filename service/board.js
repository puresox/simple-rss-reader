const mysql = require('../mysql');

module.exports = {
  create: async (userid, articleid) => {
    const sqlString = 'insert into board (userid, articleid) values(?, ?)';
    const values = [userid, articleid];
    const { results } = await mysql(sqlString, values);
    return results;
  },

  find: async (userid) => {
    const sqlString =
      'select * from board left join article where board.articleid = article.id and board.userid = ?';
    const values = [userid];
    const { results: articles } = await mysql(sqlString, values);
    return articles;
  },

  remove: async (userid, articleid) => {
    const sqlString = 'delete from board where userid = ? and articleid = ?';
    const values = [userid, articleid];
    await mysql(sqlString, values);
  },
};
