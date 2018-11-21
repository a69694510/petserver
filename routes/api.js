const router = require('koa-router')()
let Services = require('../services/services');
// router.prefix('/api')

//这样的好处是，路由全都不要了，只有一个api,js，根据前端提交的名字来获取路由
router.get('/:name?/:method?',async function(ctx,next){
  var name = ctx.params.name || 'empty';
  var method = ctx.params.method || 'empty';
  try{
      let service =new Services[name +'Service']();
      await service[method](ctx);
  }
  catch(err){
      let service =new Services['emptyService']();
      await service['out'](ctx)
  }
  return;
})

router.post('/:name?/:method?',async function(ctx,next){
  var name = ctx.params.name || 'empty';
  var method = ctx.params.method || 'empty';
  var service =new Services[name +'Service']();
  if(!Services[name+'Service']){
      //如果实例化失败
      service =new Services.emptyService();
  }
  await service[method](ctx);
  return;
})
module.exports = router
