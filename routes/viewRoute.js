const router = require('express').Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

router.get('/', viewController.HomePage);
router.get('/login', viewController.LoginPage);
router.get('/signup', viewController.SignUpPage);
router.get(
  '/dashboard',
  authController.restrictTo('user'),
  viewController.dashboardPage
);
router.get(
  '/admindash',
  authController.restrictTo('admin'),
  viewController.AdminDashboadPage
);

module.exports = router;
