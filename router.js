const Router = require('koa-router');
const signup = require('./router/signup');
const signin = require('./router/signin');
const signout = require('./router/signout');
const article = require('./router/article');
const changePassword = require('./router/changePassword');

const router = new Router();

router.redirect('/', '/article');
router.use('/signup', signup.routes(), signup.allowedMethods());
router.use('/signin', signin.routes(), signin.allowedMethods());
router.use('/signout', signout.routes(), signout.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());
router.use('/changePassword', changePassword.routes(), changePassword.allowedMethods());

module.exports = router;
