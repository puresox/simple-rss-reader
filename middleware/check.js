module.exports = {
  checkHasSignIn: async (ctx, next) => {
    const userid = ctx.cookies.get('userid');
    if (!userid) {
      ctx.redirect('/signin');
    }
    await next();
  },
  checkNotSignIn: async (ctx, next) => {
    const userid = ctx.cookies.get('userid');
    if (userid) {
      ctx.redirect('/article');
    }
    await next();
  },
};
