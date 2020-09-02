const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to mongoDb database .... '));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('./controllers/authController').seralizeUser);

//Routes
app.use('/', require('./routes/viewRoute'));
app.use('/api', require('./routes/indexRoute'));
app.all('*', require('./controllers/viewController').AllError);

//Listen To server
app.listen(port, () =>
  console.log(
    `\nserver has started  on port ${port}\nhttp://localhost:${port}/`
  )
);
