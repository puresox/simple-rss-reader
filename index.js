const Koa = require('koa');
const views = require('koa-views');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const { keys } = require('./config/config');
const rssService = require('./service/rss');
const { find } = require('./service/source');
const serve = require('koa-static');

const app = new Koa();

app.keys = keys;

app.use(serve('public'));

app.use(bodyParser());

// Must be used before any router is used
app.use(views(`${__dirname}/views`, {
  // extension: 'ejs',
  map: {
    html: 'ejs',
  },
  options: {},
}));

app.use(router.routes());

app.listen(3000);

const rss = async () => {
  const sources = await find();
  await rssService.updateArticlesForAllSource(sources);
};
rss();
setInterval(rss, 600000);
