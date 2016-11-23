var Sequelize   = require('sequelize');
var fs          = require('fs');
var path        = require('path');
var chalk       = require('chalk');
var secrets     = require('../config/secrets.json');

var connect = function (showMessage) {
  // Database sequelize
  var connection;
  var username;
  var password;
  var database;
  if (process.env.NODE_ENV === 'production'){
    connection  = secrets.production.connection;
    database    = secrets.production.database;
    username    = secrets.production.username;
    password    = secrets.production.password;
  }else{
    connection  = secrets.development.connection;
    database    = secrets.development.database;
    username    = secrets.development.username;
    password    = secrets.development.password;
  }
  try {
    var sequelize = new Sequelize(connection);
  }catch(err){
    console.log(err);
  }
// Model ORM configurations
  var discover = path.join(__dirname, 'models');
  var matcher = function (file) {
    return true;
  };

  // Check the connection to the database
  sequelize.authenticate().then(function () {
    if(showMessage){
      console.log("Environment: ", process.env.NODE_ENV);
      console.log(chalk.green("Connection to database successfull"));
    }
  }).catch(function () {
    console.log("Environment: ", process.env.NODE_ENV);
    console.log(chalk.red("Unable to connect to the database"));
  });

  return sequelize;
};

var fast_connect = function () {
  var connectionString;
  if (process.env.NODE_ENV === 'production'){
    connectionString = secrets.production.connection;
  }else{
    connectionString = secrets.development.connection;
  }
  var sequelize = new Sequelize(connectionString);

  return sequelize;
};

module.exports = {
  connect,
  fast_connect
};
