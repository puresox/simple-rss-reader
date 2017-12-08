const Router = require('koa-router');
const signup = require('./router/signup');
const signin = require('./router/signin');
const article = require('./router/article');

const router = new Router();

router.redirect('/', '/article');
router.use('/signup', signup.routes(), signup.allowedMethods());
router.use('/signin', signin.routes(), signin.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());

module.exports = router;
