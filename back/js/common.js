// 需求: 在发送第一个ajax的时候, 开启进度条, 在全部的ajax回来的时候, 结束进度条
$(document).ajaxStart(function(){
  // 开启进度条
  NProgress.start();

});
$(document).ajaxStop(function(){
  // 开启进度条
  setTimeout(function(){
    NProgress.done();

  },3000)
 
});
// 公共的效果
// 1. 二级菜单切换效果
// 2. 左侧菜单栏切换
// 3. 退出功能
$(function(){
  $(".nav .category").click(function(){
    $(".nav .fenlei1").stop().slideToggle();
  });
  $(".icon_menu ").click(function(){
    $('.lt_asode').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  });

// 3. 点击右侧退出, 显示模态框

$(".icon_logout").click(function(){
  $("#logoutModal").modal("show");
});
$("#logoutbtn").click(function(){
  // 退出功能, 应该调用后台提供的接口, 在服务器端销毁该用户的登陆状态
    $.ajax({
      url:"/employee/employeeLogout",
      type:"get",
      dataType:"json",
      success:function(info){
        if( info.success ){
          location.href = "login.html";
        }
      }
    })
  })
});