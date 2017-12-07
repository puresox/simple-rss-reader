const mysql = require('../mysql');

module.exports = {
  create: async (userid, sourceid) => {
    const sqlString = 'insert into subscribe(userid, sourceid) values(?, ?)';
    const values = [userid, sourceid];
    await mysql(sqlString, values);
  },

  find: async (userid) => {
    const sqlString =
      'select * from subscribe left join source where subscribe.sourceid = source.id and subscribe.userid = ?';
    const values = [userid];
    await mysql(sqlString, values);
  },

  remove: async (userid, sourceid) => {
    const sqlString = 'delete from subscribe where userid = ? and sourceid = ?';
    const values = [userid, sourceid];
    await mysql(sqlString, values);
  },
};
