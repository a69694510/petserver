var Sequelize = require('sequelize');
var sequelize = require('./ModelHeader');
var SayImgModel = sequelize.define('sayimgs',{
  id:{type:Sequelize.BIGINT,primaryKey:true},
  uid:Sequelize.BIGINT,
  sayid:Sequelize.BIGINT,
  imgpath:Sequelize.STRING
},{
  timestamps: false,
});
module.exports = SayImgModel;
