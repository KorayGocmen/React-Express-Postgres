var chalk = require('chalk');
var error_handler = function (err) {
  var response;
  console.log(chalk.red(err));
  var errorsMessageArray = [];
  for(var i=0; i<err.errors.length; i++){
    errorsMessageArray.push(err.errors[i].message);
  }
  response = {
    success: false,
    errors: errorsMessageArray
  };
  return response;
};

module.exports = {error_handler};