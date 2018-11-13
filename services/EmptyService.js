class EmptyService{
  constructor(){
    //super
  }
  async out(ctx){
    ctx.body='没有这个页面'
  }
}
exports.service = EmptyService;
