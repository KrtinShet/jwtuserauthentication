const User = require('./../models/userModel');
const createJWT = require('./../utils/createJwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.checkPassword(password))) {
    return res
      .status(401)
      .json({ status: 'fail', message: 'Incorrect email or password' });
  }
  const token = createJWT(jwt, user.id, user.userType);
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
    ),
  });
  res.status(200).json({
    status: 'success',
    message: 'you are now logged in',
  });
};

exports.postSignUp = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: 'fail',
      message: 'Email is already registered try with another email',
    });
  }

  // check for password validation
  if (!confirmPassword || password !== confirmPassword) {
    return res.status(409).json({
      status: 'fail',
      message: 'Password Confirmation does not match',
    });
  }
  // Create a new user
  const newUser = await User.create({ username, email, password });
  //sign a jwt token
  const token = createJWT(jwt, newUser.id, newUser.userType);
  newUser.password = undefined;
  newUser.__v = undefined;
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
    ),
  });
  res.status(201).json({
    status: 'success',
    message: 'You are now signed Up',
    user: newUser,
  });
};

exports.getLogout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
};

exports.seralizeUser = async (req, res, next) => {
  const token = req.cookies['jwt'];
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWTSECRET);
      const user = await User.findById(decoded.uid);
      req.user = user;
      res.locals.user = user;
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (user) => {
  return (req, res, next) => {
    if (typeof req.user !== 'undefined') {
      if (req.user.userType !== user) {
        return res.status(401).json({
          status: 'fail',
          message: 'you are not authorised to access this route',
        });
      }
    } else {
      return res.status(401).json({
        status: 'fail',
        message: 'you are not authorised to access this route',
      });
    }
    next();
  };
};
