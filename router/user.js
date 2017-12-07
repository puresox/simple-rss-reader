const Router = require('koa-router');
const userModel = require('../service/user');

const router = new Router();

router.get('/', async (ctx) => {
  const user = await userModel.find();
  const hash = crypto
  .createHmac('sha256', secret)
  .update(password)
  .digest('hex');
  await ctx.render('login');
});

module.exports = router;
