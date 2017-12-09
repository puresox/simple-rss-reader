const Router = require('koa-router');
const userModel = require('../service/user');
const { secret, cookie } = require('../config/config');
const crypto = require('crypto');
const { checkNotSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkNotSignIn);

router
  .get('/', async (ctx) => {
    await ctx.render('signup');
  })
  .post('/', async (ctx) => {
    const { username, password } = ctx.request.body;
    const hash = crypto
      .createHmac('sha256', secret)
      .update(password)
      .digest('hex');
    const { insertId } = await userModel.create(username, hash);
    ctx.cookies.set('userid', insertId, cookie);
    ctx.cookies.set('username', username, cookie);
    await ctx.redirect('/');
  });

module.exports = router;
