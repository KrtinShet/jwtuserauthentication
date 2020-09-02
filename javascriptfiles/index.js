const axios = require('axios').default;
window.onload = () => {
  const url = window.location.pathname;
  console.log(url);

  //Login route Form
  if (url === '/login') handleLoginRoute();
  //Signup route Form
  if (url === '/signup') handleSignupRoute();
  if (url === '/dashboard') handleLogout();
};
const hide = () => {
  const alert = document.querySelector('.alert');
  if (alert) alert.parentElement.removeChild(alert);
};
const showAlert = (type, msg) => {
  hide();
  const HTMLmarkup = `<div class="alert alert-${type}" role="alert">${msg}</div>`;
  document.querySelector('header').insertAdjacentHTML('afterend', HTMLmarkup);
  window.setTimeout(hide, 1500);
};

const handelOauth = () => {
  const googleLogin = document.getElementById('googleLogin');
  const facebookLogin = document.getElementById('facebookLogin');
  googleLogin.addEventListener('click', function (e) {
    console.log(e);
    console.log('clicked on google login button');
  });
  facebookLogin.addEventListener('click', function (e) {
    console.log(e);
    console.log('clicked on face login button');
  });
};

const handleLoginRoute = () => {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/login',
      data: { email, password },
    }).then((response) => {
      if (response.data.status === 'success') {
        showAlert('success', 'Logged In Successfully!');
        window.setTimeout(() => {
          location.assign('/dashboard');
        }, 500);
      }
    });
  });
  handelOauth();
};

const handleSignupRoute = () => {
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password === confirmPassword) {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/signup',
        data: { email, username, password, confirmPassword },
      }).then((response) => {
        if (response.data.status === 'success') {
          showAlert('success', 'Signed In Successfully!');
          window.setTimeout(() => {
            location.assign('/dashboard');
          }, 500);
        }
      });
    } else {
      showAlert('danger', 'Password Confirmation doesnot match');
    }
  });
  handelOauth();
};

const handleLogout = (e) => {
  const logoutbtn = document.getElementById('logoutbtn');
  logoutbtn.addEventListener('click', function (e) {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/api/logout',
    }).then((response) => {
      if (response.data.status === 'success') {
        showAlert('success', 'Logged Out Successfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 500);
      }
    });
  });
};
