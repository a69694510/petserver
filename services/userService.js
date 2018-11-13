var UserModel = require('../model/UserModel');

class UserService{
  constructor(){
    //super
  }
  async test(ctx){
    ctx.body='test'
  }
  async signup(ctx){
    let user = {
      email:ctx.request.body.email,
      pwd:ctx.request.body.pwd,
      nickname:ctx.request.body.nickname,
      createtime:new Date(),
      //role角色
      role:0
    };
    try {
      //User.Model这个示例create()就会自动翻译成对库操作，
      let rs = await UserModel.create(user);

      ctx.body = 1
      // let email = ctx.request.body.email;
      // ctx.body = 'shoudao:'+email
      // console.log(email)
    } catch (e) {
      console.log('--------------------')
      if(e.errors[0].message.indexOf('emaliuniq')>-1){
        ctx.body =2
      }
      else if(e.errors[0].message.indexOf('nicknameuniq')>-1){
        ctx.body =3
      }else {
        ctx.body = 0
      }
    } finally {
      console.log('----------------')
    }
  }
  async signin(ctx){
    let user={
      email:ctx.request.body.email,
      pwd:ctx.request.body.pwd
    };
    //findOne就是查库

    let rs = await UserModel.findOne({
        where:{'email':user.email,'pwd':user.pwd}
        //where:{'email':user}
    });

    //
    if(rs!=null){
      //登陆成功以后创建session
      let loginbean={};
      loginbean.id=rs.id;
      loginbean.nickname=rs.nickname;
      loginbean.role=rs.role
      //把信息都放到session里面
      ctx.session.loginbean = loginbean
      //但是跨域访问，一跳转session就没了,跨域的时候不给前端设置cookie
      // console.log(ctx.session.loginbean.nickname)
      ctx.body = loginbean
      //ctx.body = ‘登陆成功’
    }
    else {
      ctx.body = 0
    }
  }
}
exports.service = UserService
