const Router = require('koa-router');
const userModel = require('../service/user');
const { secret } = require('../config/config');
const crypto = require('crypto');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  .get('/', async (ctx) => {
    await ctx.render('changePassword');
  })
  .post('/', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const { oldPassword, newPassword } = ctx.request.body;
    const hashOldPassword = crypto
      .createHmac('sha256', secret)
      .update(oldPassword)
      .digest('hex');
    const hashNewPassword = crypto
      .createHmac('sha256', secret)
      .update(newPassword)
      .digest('hex');
    const user = await userModel.findByid(userid);
    if (user.password !== hashOldPassword) {
      await ctx.redirect('/changePassword');
    } else {
      await userModel.updatePassword(userid, hashNewPassword);
      await ctx.redirect('/');
    }
  });

module.exports = router;
