exports.HomeGet = (req, res) => {
  res.status(302).redirect('/');
};

exports.LoginGet = (req, res) => {
  res.status(302).redirect('/login');
};

exports.SignupGet = (req, res) => {
  res.status(302).redirect('/signup');
};
