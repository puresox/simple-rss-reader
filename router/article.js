const Router = require('koa-router');
const articleModel = require('../service/article');
const subscribeModel = require('../service/subscribe');
const sourceModel = require('../service/source');
const rssService = require('../service/rss');
const boardService = require('../service/board');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  // 文章页
  .get('/', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const username = ctx.cookies.get('username');
    const articles = await articleModel.findByUser(userid);
    const sources = await subscribeModel.find(userid);
    await ctx.render('article', {
      articles,
      sources,
      name: 'All',
      username,
    });
  })
  // 某资源文章页
  .get('/source/:sourceid', async (ctx) => {
    const { sourceid } = ctx.params;
    const userid = ctx.cookies.get('userid');
    const username = ctx.cookies.get('username');
    const articles = await articleModel.findBySource(sourceid);
    const sources = await subscribeModel.find(userid);
    const { name } = await sourceModel.findById(sourceid);
    await ctx.render('article', {
      articles,
      sources,
      name,
      username,
    });
  })
  // 管理订阅页
  .get('/subscription', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const username = ctx.cookies.get('username');
    const sources = await subscribeModel.find(userid);
    await ctx.render('subscription', { sources, username });
  })
  // board
  .get('/board', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const username = ctx.cookies.get('username');
    const articles = await boardService.find(userid);
    const sources = await subscribeModel.find(userid);
    await ctx.render('board', {
      articles,
      sources,
      username,
    });
  })
  // 某资源文章页
  .post('/searchResult', async (ctx) => {
    const { search } = ctx.request.body;
    const userid = ctx.cookies.get('userid');
    const username = ctx.cookies.get('username');
    const articles = await articleModel.findByTitle(userid, search);
    const sources = await subscribeModel.find(userid);
    await ctx.render('article', {
      articles,
      sources,
      name: 'results',
      username,
    });
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
      await rssService.updateArticlesForOneSource(insertId, rss);
      sourceid = insertId;
    } else {
      sourceid = source.id;
    }
    await subscribeModel.create(userid, sourceid);
    await ctx.redirect('/article/subscription');
  })
  // 取消订阅
  .post('/removeSubscription', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const { sourceid } = ctx.request.body;
    await subscribeModel.remove(userid, sourceid);
    await ctx.redirect('/article/subscription');
  })
  // save to board
  .post('/saveToBoard', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const { articleid } = ctx.request.body;
    await boardService.create(userid, articleid);
    await ctx.redirect('/article/board');
  })
  // remove from board
  .post('/removeFromBoard', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const { articleid } = ctx.request.body;
    await boardService.remove(userid, articleid);
    await ctx.redirect('/article/board');
  });

module.exports = router;
