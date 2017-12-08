const mysql = require('../mysql');

module.exports = {
  create: async (userid, sourceid) => {
    const sqlString = 'insert into subscribe(userid, sourceid) values(?, ?)';
    const values = [userid, sourceid];
    const { results } = await mysql(sqlString, values);
    return results;
  },

  find: async (userid) => {
    const sqlString =
      'select * from subscribe left join source where subscribe.sourceid = source.id and subscribe.userid = ?';
    const values = [userid];
    const { results: sources } = await mysql(sqlString, values);
    return sources;
  },

  remove: async (userid, sourceid) => {
    const sqlString = 'delete from subscribe where userid = ? and sourceid = ?';
    const values = [userid, sourceid];
    await mysql(sqlString, values);
  },
};
