const Router = require('koa-router');
const userModel = require('../service/user');
const { secret, cookie } = require('../config/config');
const crypto = require('crypto');
const { checkNotSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkNotSignIn);

router
  .get('/', async (ctx) => {
    await ctx.render('signin');
  })
  .post('/', async (ctx) => {
    const { username, password } = ctx.request.body;
    const hash = crypto
      .createHmac('sha256', secret)
      .update(password)
      .digest('hex');
    const [user] = await userModel.find(username);
    if (user.password !== hash) {
      await ctx.redirect('/signin');
    } else {
      ctx.cookies.set('userid', user.id, cookie);
      ctx.cookies.set('username', user.username, cookie);
      await ctx.redirect('/');
    }
  });

module.exports = router;
