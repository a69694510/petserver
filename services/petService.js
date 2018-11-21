let formidable = require('formidable')
let PetinfoModel = require('../model/PetinfoModel')
class PetService{
  constructor(){
    //super
  }
  async subpetInfo(ctx){
    let loginbean = ctx.session.loginbean
    let form = new formidable.IncomingForm()  //创建上传表单
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/petimgs';   //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小5m
    // console.log(ctx.req);
    //这里最好使用异步接受
    let fields = await new Promise(function(resolve,reject){
      form.parse(ctx.req,function(err,fields,files){
        if(err){
          console.log(err)
          resolve(0);
          return;
        }
        console.log('ces9999')
        //去掉路径里面的public
        fields.petimg = files.petimg.path.replace('public','')
        resolve(fields);
      })
    });
    fields.uid = loginbean.id
    fields.createtime = new Date();
    //存储
    let rs = await PetinfoModel.create(fields);
    ctx.body=rs
  }
  async mypetinfo(ctx){
    let loginbean  = ctx.session.loginbean;
    if(loginbean){
      let pet ={uid:loginbean.id}; //{uid:loginbean.id}
      let count = await PetinfoModel.count({where:pet});
      let pagesize=3;
      // if(ctx.query.page){
      //
      // }
      let rs = await PetinfoModel.findAll({where:pet});
      console.log(rs)
      ctx.body=rs
    }
    else {
      ctx.body='登陆过期'
    }
  }
}
exports.service = PetService
