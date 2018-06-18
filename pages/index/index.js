//index.js
//获取应用实例
const app = getApp()

//导入游戏逻辑代码
var gamelogic = require("./gamelogic.js");

Page({
  data: {
    //初始化数组
    numbers: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    currentscord: 2,
    touchstart: [0,0],
    touchend:[0,0],
    fail: false
  },
  onReady: function(){
    //所有资源准备好之后插入一个初始
    this.setData({
      numbers: gamelogic.insertone(this.data.numbers)
    })
  },
  //记录开始触摸屏幕的坐标
  touchstart: function(event){
    this.setData({
      touchstart: [Math.round(event.touches[0].clientX), Math.round(event.touches[0].clientY)],
    });
  },
  touchmove: function(event){
    this.setData({
      touchend: [Math.round(event.touches[0].clientX), Math.round(event.touches[0].clientY)],
    });
  },
  //记录结束触摸时的坐标
  touchend: function(event){
    //获得滑向的位置
    var direction = gamelogic.getdirection(this.data.touchstart,this.data.touchend);
    //根据位置变幻数组
    var numbersnow = gamelogic.changearray(this.data.numbers, direction);
      this.setData({
        numbers: numbersnow
      }, () => {
        this.setData({ numbers: gamelogic.insertone(this.data.numbers) });
        //记录为零的格子
        var zero = 0;
        for (var i = 0; i < this.data.numbers.length; i++) {
          for (var j = 0; j < this.data.numbers[0].length; j++) {
            if (this.data.numbers[i][j]==0){
              zero++;
            } 
            else if(this.data.numbers[i][j] > this.data.currentscord) {
              this.setData({ currentscord: this.data.numbers[i][j] });
            }
          }
        }
        //如果为零的格子为零个则游戏失败
        if (!zero){
          this.setData({
            fail: true
          });
        }
      })
    },
    //游戏重新开始
  regame: function(){
    this.setData({
      numbers: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    },()=>{
      this.setData({ numbers: gamelogic.insertone(this.data.numbers)});
    })
  }
})
