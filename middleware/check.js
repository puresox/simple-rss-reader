module.exports = {
  checkHasSignIn: (ctx) => {
    const userid = ctx.cookies.get('userid');
    if (!userid) {
      ctx.redirect('/signin');
    }
  },
  checkNotSignIn: (ctx) => {
    const userid = ctx.cookies.get('userid');
    if (userid) {
      ctx.redirect('/article');
    }
  },
};
