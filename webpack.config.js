var webpackProd = require('./config/webpack.common');
var webpackDev = require('./config/webpack.dev');

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = webpackProd;
    break;

  case 'dev':
  case 'development':
  default:
    module.exports = webpackDev;;
}
