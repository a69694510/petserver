let formidable = require('formidable')
let SayModel = require('../model/SayModel')
let SayImgModel = require('../model/SayImgModel')
var sequelize = require('../model/ModelHeader');



class SayService{
  constructor(){
    //super
  }
  async subSay(ctx){
    //这个提交说说是一对多的关系
    let loginbean = ctx.session.loginbean
    let form = new formidable.IncomingForm()  //创建上传表单
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/sayphoto';   //设置上传目录
    form.keepExtensions = true; //保留后缀

    form.multiples=true;//允许多文件上传
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
        fields.imgArr=[]
        let len = files.petimg.length;
        for(let i=0;i<len;i++){
          if(files.petimg[i].size>0){
            let imgpath=files.petimg[i].path.replace('public','')
            let sayImg={imgpath:imgpath};
            fields.imgArr.push(sayImg)

          }
        }
        resolve(fields);


      })
    });
    //拿到uid也就是谁发的说说
    fields.uid=loginbean.id
    fields.createtime=new Date();
    try{
      //事务处理 在事务里面，只要在对库操作的时候加上{transaction:t} 就可以
      let t =await sequelize.transaction();

      //

      let sayRs = await SayModel.create(fields,{
        transaction:t
      });
      let imgArr = fields.imgArr;
      let len=imgArr.length
      for(let i=0;i<len;i++){
        imgArr[i].uid=loginbean.id
        //数在null里面 很奇怪
        imgArr[i].sayid=sayRs.null
        await SayImgModel.create(imgArr[i],{
          transaction:t
        })
      }
      t.commit();
    }
    catch(err){
      console.log(err);
      //如果有例外就回滚
      t.rollback()
      ctx.body='数据库错误';
      return
    }

    ctx.body='成功'
  }

}
exports.service = SayService
