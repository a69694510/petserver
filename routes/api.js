const router = require('koa-router')()
let Services = require('../services/services');
// router.prefix('/api')

//这样的好处是，路由全都不要了，只有一个api,js，根据前端提交的名字来获取路由
router.get('/:name?/:method?',async function(ctx,next){
  var name = ctx.params.name || 'empty';
  var method = ctx.params.method || 'empty';
  // ctx.body = '收到:'+name+','+method
  //这个new 完以后的servce名字就叫做 user service name给其名就叫user
    //name+'Service'拼上以后，正好是userService就是导出的
  try{
      let service =new Services[name +'Service']();
      await service[method](ctx);
  }
  catch(err){
      let service =new Services['emptyService']();
      await service['out'](ctx)
  }

  //
  // if(!Services[name+'Service']){
  //     //如果实例化失败
  //     service =new Services.emptyService();
  // }
  // await service[method](ctx);
  return;
})

router.post('/:name?/:method?',async function(ctx,next){
  var name = ctx.params.name || 'empty';
  var method = ctx.params.method || 'empty';
  // ctx.body = '收到:'+name+','+method
  //这个new 完以后的servce名字就叫做 user service name给其名就叫user

  //name+'Service'拼上以后，正好是userService就是导出的
  var service =new Services[name +'Service']();
  if(!Services[name+'Service']){
      //如果实例化失败
      service =new Services.emptyService();
  }
  await service[method](ctx);
  return;
})
module.exports = router
