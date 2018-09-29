/**
 * Created by Jepson on 2018/9/29.
 */
$(function() {

  var currentPage = 1; // 表示当前页
  var pageSize = 5; // 每页多少条

  // 1. 一进入页面发送ajax请求, 获取数据, 渲染页面
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "secondTpl", info );
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 指定版本号
          bootstrapMajorVersion: 3,
          // 指定总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 指定当前页
          currentPage: info.page,
          // 给按钮绑定点击事件
          onPageClicked: function(a, b, c, page) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }


  // 2. 点击添加分类按钮, 显示模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 发送 ajax 请求, 请求所有的一级分类, 进行列表渲染
    // 利用分页接口, 模拟获取全部一级分类的接口, 传 page=1, pageSize=100
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("dropdownTpl", info);
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });


  // 3. 给下拉列表中的 a 添加点击事件(通过事件委托注册), 获取 a 的文本, 设置给按钮
  $('.dropdown-menu').on("click", "a", function() {
    // 获取文本
    var txt = $(this).text();
    // 设置给按钮
    $('#dropdownTxt').text( txt );

    // 获取当前 a 中存储的 id
    var id = $(this).data("id");
    // 设置给 name="categoryId" 的input
    $('[name="categoryId"]').val( id );

    // 选择了一级分类, 需要将一级分类校验状态, 更新成校验成功状态
    // 参数1: 字段名称
    // 参数2: 校验状态, VALID成功, INVALID失败
    // 参数3: 校验规则, 配置错误时的提示信息
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });



  // 4. 文件上传初始化
  /*
   * 文件上传步骤
   * 1. 引包, 注意依赖问题
   * 2. html结构, 给 input:file添加 name 和 data-url 属性
   * 3. 通过 fileupload 方法初始化文件上传插件
   * */

  $('#fileupload').fileupload({
    dataType: "json",
    // 文件上传完成时调用的回调函数
    done: function( e, data ) {
      // data.result 就是后台返回的数据
      console.log( data.result )
      // 获取图片地址
      var picUrl = data.result.picAddr;
      // 设置给图片src
      $('#imgBox img').attr("src", picUrl);

      // 将图片地址设置给 name="brandLogo" 的 input 用于提交
      $('[name="brandLogo"]').val( picUrl );

      // 重置校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });




  // 5. 进行表单校验初始化
  $("#form").bootstrapValidator({
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)']
    // 需要对隐藏域进行校验, 不能排除隐藏域, 将 excluded 置为 [], 表示对所有 input 进行校验
    excluded: [],


    // 指定校验时显示的图标, 固定写法
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });




  // 6. 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 提交
  $('#form').on("success.form.bv", function( e ) {

    e.preventDefault();

    // 通过 ajax 提交
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 关闭模态框
          $('#addModal').modal("hide");

          // 页面需要重新渲染, 重新渲染第一页
          currentPage = 1;
          render();

          // 表单需要重置, 文本和状态都要重置
          $('#form').data("bootstrapValidator").resetForm(true);

          // 重置只能重置表单元素, 下拉菜单的按钮和图片需要手动重置
          $('#dropdownTxt').text("请选择一级分类");
          $('#imgBox img').attr("src", "images/none.png");
        }
      }
    })

  })




})

