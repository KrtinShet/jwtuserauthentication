const path = require('path');

module.exports = {
  entry: './javascriptfiles/index.js', //location of your main js file
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/index.js', // where js files would be bundled to
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  watch: true,
};
