const Router = require('koa-router');
const { checkNotSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkNotSignIn);

router.get('/', async (ctx) => {
  ctx.cookies.set('userid', '');
  ctx.cookies.set('username', '');
  await ctx.redirect('/signin');
});

module.exports = router;
