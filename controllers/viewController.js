exports.HomePage = (req, res) => {
  res.status(200).render('home');
};

exports.LoginPage = (req, res) => {
  res.status(200).render('login');
};

exports.SignUpPage = (req, res) => {
  res.status(200).render('signup');
};
exports.dashboardPage = (req, res) => {
  res.status(200).render('dashboard');
};

exports.AdminDashboadPage = (req, res) => {
  res.status(200).render('admindashboard');
};

exports.AllError = (req, res) => {
  res.render('error');
};
