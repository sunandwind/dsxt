$(function(){
  var currentPage = 1;
  var pageSize = 5;

     render();

      function render(){
      $.ajax({
       type:"get",
       url:"/category/queryTopCategoryPaging",
       data:{
         page:currentPage,
         pageSize:pageSize
       },
       dataType:"json",
       success:function(info){
         var htmlStr = template("tpl",info);
         $("tbody").html(htmlStr);

          // 分页初始化
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            totalPages:Math.ceil(info.total / info.size),
            currentPage:info.page,
             // 给页码添加点击事件
          // event 是插件包装过的对象
          // originalEvent 是原始的事件对象
          // type 指代当前点击的页码类型, page普通页码, first, last, next, prev
          // page 指代当前点击按钮对应的页码
          onPageClicked:function(event,originalEvent,type,page){
            currentPage = page;
            render();
           }
          })
         }
       });
      }

      $("#addBtn").click(function(){
        
        $("#addModal").modal("show");
      });
      // 3. 通过表单校验插件, 实现表单校验功能
      $("#form").bootstrapValidator({
         // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        // 配置校验字段
    fields: {
      categoryName: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "请输入一级分类名称"
           }
          }
         }
        } 
      });
// 4. 注册表单校验成功事件, 阻止校验成功时的默认提交, 通过ajax提交
$("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
    type:"post",
    url:"/category/addTopCategory",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      if(info.success){
        $("#addModal").modal("hide");
        currentPage = 1;
        render();
         // 表单内容和校验状态都要重置, resetForm传 true 才将内容和状态都重置
         $('#form').data("bootstrapValidator").resetForm(true);
         }
       }
     })
  });
});