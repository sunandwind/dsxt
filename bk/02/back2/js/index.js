$(function() {

  // 实现柱状图和饼状图

  // 1. 左侧柱状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector(".echarts_1"));

  // 指定图表的配置项和数据
  var option1 = {
    // 大标题
    title: {
      // 标题文本
      text: '2017年 注册人数',
      // 配置标题样式
      textStyle: {
        color: "red",
        //fontSize: 30  // 配置大小
      }
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data:['人数']
    },
    // 表示 x 轴
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // 表示 y 轴, y 轴一般是刻度, 尽量根据数据自适应
    yAxis: {},
    // 配置的是数据
    series: [{
      name: '人数',
      // type 表示图标的类型, bar柱状图, line 折线图, pie 饼图
      type: 'bar',
      data: [1000, 1500, 2500, 1300, 1800, 2400]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option1);


  // 2. 右侧饼状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_2 = echarts.init(document.querySelector(".echarts_2"));

  // 指定图表的配置项和数据
  var option2 = {
    // 大标题
    title : {
      text: '热门品牌销售',
      // 子标题
      subtext: '2017年6月',
      // 控制水平对齐方式
      x:'center'
    },
    // 提示框组件
    tooltip : {
      trigger: 'item',  // 表示鼠标滑到数据项上面时触发

      // 自定义提示框内容
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    // 图例
    legend: {
      // 配置图例的显示方式, horizontal 水平排列
      orient: 'vertical',
      // 配置水平对齐方式
      left: 'left',
      data: ['耐克','阿迪','李宁','耐克王','李宁王']
    },
    series : [
      {
        name: '品牌销量',
        type: 'pie',   // type 类型是 饼状图    line/bar
        // 圆的大小
        radius : '50%',
        // 圆心的位置
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'李宁'},
          {value:135, name:'耐克王'},
          {value:1548, name:'李宁王'}
        ],
        // 表示额外的阴影等效果
        itemStyle: {
          emphasis: {
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: 'yellow'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option2);


})