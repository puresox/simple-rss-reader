const Koa = require('koa');
const views = require('koa-views');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const { keys } = require('./config/config');

const app = new Koa();

app.keys = keys;

app.use(bodyParser());

// Must be used before any router is used
app.use(views(`${__dirname}/views`, {
  extension: 'handlebars',
  map: {
    html: 'handlebars',
  },
  options: {},
}));

app.use(router.routes());

app.listen(3000);
