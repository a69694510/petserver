var Sequelize = require('sequelize');
//数据库名字，账号，密码
var sequelize = new Sequelize('pet','root','toor',{
  host:'127.0.0.1',
  // sequelize可以映射很多重数据库.包括sqlserver,但是不能映射nosql的数据库
  dialect:'mysql'
});
module.exports = sequelize
