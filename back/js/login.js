$(function(){
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  // 实现表单校验功能, 进行表单校验初始化
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度在2-6之间'
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度在6-12之间'
          }, 
          callback: {
            message: "密码错误"
          }
        }
      },
    }
  });
/*
  * 2. 通过 submit 按钮进行提交表单, 可以让表单校验插件进行校验
  *    (1) 校验通过, 默认将表单继续提交, 会跳转页面, 需要在校验通过后,
  *        阻止默认的提交, 通过 ajax 进行登录请求
  *    (2) 校验失败, 表单校验插件本身就会阻止默认的提交
  *
  *    思路: 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
  * */
 $("#form").on("success.form.bv", function (e) {
   // 阻止默认的表单提交
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    url:"/employee/employeeLogin",
    type:"post",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      if(info.success){
        location.href="index.html";
      }
      if(info.error ===1000){
         // 将表单用户名校验状态从成功更新成失败, 并且给用户提示
         $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
      }
      if(info.error ===1001){
        // 将表单用户名校验状态从成功更新成失败, 并且给用户提示
        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
       }
     }
   })
  });
   /*
  * 3. 添加重置功能
  * */
 $('[type="reset"]').click(function() {
  // 调用插件的方法, 进行重置
  // resetForm(boolean)
  // 1. true, 表示将表单内容和校验状态都重置
  // 2. false, 只重置校验状态
  $('#form').data("bootstrapValidator").resetForm();
})

})