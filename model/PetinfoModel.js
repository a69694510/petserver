var Sequelize = require('sequelize');
//拿到实例连接
var sequelize = require('./ModelHeader');
//做映射
var PetinfoModel = sequelize.define('petinfos',{
  id:{type:Sequelize.BIGINT,primaryKey:true},
  uid:Sequelize.BIGINT,
  nickname:Sequelize.STRING,
  pettype:Sequelize.INTEGER,
  petsort:Sequelize.STRING,
  sex:Sequelize.TEXT('tiny'),
  age:Sequelize.INTEGER,
  introduce:Sequelize.STRING,
  petimg:Sequelize.STRING,
  updtime:Sequelize.DATE,
  createtime:Sequelize.DATE
},{
  timestamps:false,
});
module.exports = PetinfoModel;
