const Koa = require('koa');
const views = require('koa-views');
const router = require('./router');

const app = new Koa();

// Must be used before any router is used
app.use(views(`${__dirname}/views`, {
  extension: 'handlebars',
  map: {
    html: 'handlebars',
  },
  options: {},
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
