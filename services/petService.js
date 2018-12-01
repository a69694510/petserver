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
        if(files.petimgFile.size>0){
              //去掉路径里面的public
          fields.petimg = files.petimg.path.replace('public','')
          resolve(fields);
        }
        else {
          //第一次创建的时候，图片可以是空的
            fields.petimg='';
            resolve(fields);
        }
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
      let pet ={uid:loginbean.id};
      let count = await PetinfoModel.count({where:pet});
      let page=1
      let pagesize=5;
      if(ctx.query.page){
        page=ctx.query.page
      }
      //从0开始显示3条记录
      let rs = await PetinfoModel.findAll({where:pet,offset:(page-1)*pagesize,limit:pagesize});
      console.log(rs)
      let arr=[];
      arr[0]=count
      arr[1]=rs
      ctx.body=arr
    }
    else {
      ctx.body='登陆过期'
    }
  }
  async updpetInfo(ctx){
    let loginbean = ctx.session.loginbean
    let form = new formidable.IncomingForm()  //创建上传表单
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/petimgs';   //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小5m
    let fields = await new Promise(function(resolve,reject){
      form.parse(ctx.req,function(err,fields,files){
        if(err){
          resolve(0);
          return;
        }
        //去掉路径里面的public
        // fields.petimg = files.petimg.path.replace('public','')
        if(files.petimgFile.size>0){
          fields.petimg = files.petimgFile.path.replace('public','');
          resolve(fields);
        }
        resolve(fields);
      })
    });
    // fields.uid = loginbean.id
    //存储
    let rs = await PetinfoModel.update(fields,{
      where:{
        'id':fields.pid,
        'uid':loginbean.id
      }
    });
    ctx.body=1
  }
  async delpetInfo(ctx){
    let loginbean = ctx.session.loginbean;
    if(loginbean){
      //这个pet就是删除条件
      //destroy是删除的方法
      //uid的作用是，只能自己删除，不让别人删除
      let pet ={id:ctx.query.id,uid:loginbean.id};
      let rs = await PetinfoModel.destroy({
        where:pet
      });
      ctx.body=1
    }else {
      ctx.body=0
    }
  }
}
exports.service = PetService
