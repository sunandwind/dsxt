      $(function(){
      var currentPage = 1;
      var pageSize = 5;
      var currentId;
      var isdelete;

    render();
    function render(){
      $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var htmlStr = template("tpl" , info);
        $("tbody").html(htmlStr);
       
           // 分页初始化测试
           $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            totalPages:Math.ceil( info.total / info.size),
            currentPage:info.page,
             // 给分页按钮添加点击事件
             onPageClicked:function(a,b,c,page){
               currentPage = page;
               render();
             }
           });
       
        }
      })
    }
  $('tbody').on("click",".btn",function(){
    $("#userModal").modal("show");
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger")? 0:1;
    });
     $("#submitBtn").on("click", function(){
      console.log( currentId, isDelete );
       $.ajax({
         type:"post",
         url:"/user/updateUser",
         data:{
           id : currentId,
           isDelete : isDelete
         },
         dataType:"json",
         success:function(info){
           if( info.success ){
             $('#userModal').modal("hide");
             render();
           }
         }
       })
     })
  })