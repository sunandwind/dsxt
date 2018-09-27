// 这个 js 功能, 用于拦截未登陆用户
// 4. 登陆拦截功能
//    如果当前用户没登陆, 需要拦截到登陆页
//    但是前端不知道用户有没有登陆, 后端知道, 所以需要发送请求获取用户登录状态
$.ajax({
  ulr:"/employee/checkRootLogin",
  type:"get",
  dataType:"json",
  success:function(info){
    if( info.error === 400){
      location.href="login.html";
    }
    if( info.success){
      console.log( "当前用户已登陆" );
    }
  }
})