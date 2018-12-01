var Sequelize = require('sequelize');
var sequelize = require('./ModelHeader');
var SayModel = sequelize.define('saysays',{
  id:{type:Sequelize.BIGINT,primaryKey:true},
  uid:Sequelize.BIGINT,
  content:Sequelize.STRING,
  createtime:Sequelize.DATE,
  msgnum:Sequelize.INTEGER
},{
  timestamps: false,
});
module.exports = SayModel;
