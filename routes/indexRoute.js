const router = require('express').Router();
const indexController = require('./../controllers/indexController');
const authController = require('./../controllers/authController');

router.route('/').get(indexController.HomeGet);

router
  .route('/login')
  .get(indexController.LoginGet)
  .post(authController.postLogin);

router
  .route('/signup')
  .get(indexController.SignupGet)
  .post(authController.postSignUp);

router.route('/logout').get(authController.getLogout);

module.exports = router;
