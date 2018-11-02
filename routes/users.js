const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.post('/signup', function (ctx, next) {
  let email = ctx.request.body.email;
  ctx.body = 'shoudao:'+email
  console.log(email)
})


module.exports = router
