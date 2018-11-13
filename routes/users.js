const router = require('koa-router')()
var UserModel = require('../model/UserModel');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.get('/mypet',function(ctx,next){
  //注意跨域访问拿到session
  let loginbean = ctx.session.loginbean;
  console.log('-------------------------')

  ctx.body = 'mypet'
})


module.exports = router
