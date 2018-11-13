var Sequelize = require('sequelize');
//拿到实例连接
var sequelize = require('./ModelHeader');
//做映射
var UserModel = sequelize.define('users',{
  id:{type:Sequelize.BIGINT,primaryKey:true},
  email:Sequelize.STRING,
  pwd:Sequelize.STRING,
  nickname:Sequelize.STRING,
  updtime:Sequelize.DATE,
  role:Sequelize.TEXT('tiny'),
  createtime:Sequelize.DATE,
  msgnum:Sequelize.INTEGER
},{
  timestamps: false,
});
module.exports = UserModel;
