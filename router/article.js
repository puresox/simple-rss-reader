const Router = require('koa-router');
const articleModel = require('../service/article');
const subscribeModel = require('../service/subscribe');
const sourceModel = require('../service/source');
const rssService = require('../service/rss');

const router = new Router();

router
  // 文章页
  .get('/', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const articles = await articleModel.findByUser(userid);
    const sources = await subscribeModel.find(userid);
    await ctx.render('article', { articles, sources, name: 'All' });
  })
  // 某资源文章页
  .get('/:sourceid', async (ctx) => {
    const { sourceid } = ctx.params;
    const userid = ctx.cookies.get('userid');
    const articles = await articleModel.findBySource(sourceid);
    const sources = await subscribeModel.find(userid);
    const { name } = await sourceModel.findById(sourceid);
    await ctx.render('article', { articles, sources, name });
  })
  // 管理订阅页
  .get('/subscription', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const sources = await subscribeModel.find(userid);
    await ctx.render('subscription', { sources });
  })
  // 订阅
  .post('/subscribe', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    let sourceid;
    const { rss } = ctx.request.body;
    const source = await sourceModel.findByRss(rss);
    const rssObj = await rssService.getXml2js(rss);
    const {
      name, description, rssLink, link,
    } = await rssService.getSourceInfo(rssObj);
    if (!source) {
      const { insertId } = await sourceModel.create(name, description, rssLink, link);
      sourceid = insertId;
    }
    sourceid = source.id;
    await subscribeModel.create(userid, sourceid);
    await ctx.redirect('/article/subscription');
  })
  // 取消订阅
  .post('/removeSubscription', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const { sourceid } = ctx.request.body;
    await subscribeModel.remove(userid, sourceid);
    await ctx.redirect('/article/subscription');
  });

module.exports = router;
