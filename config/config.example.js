module.exports = {
  // keys
  keys: ['im a newer secret', 'i like turtle'],
  // 数据库配置
  mysql: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
  },
  // cookie配置
  cookie: {
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
  },
  secret: 'asdrjehfuidhf',
};
