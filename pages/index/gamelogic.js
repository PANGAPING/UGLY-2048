//随机插入一个2
function insertone(array) {
  while(true){
    var randomnumber = Math.floor(Math.random() * 16);
    if(!array[Math.floor(randomnumber / 4)][randomnumber % 4]){
      array[Math.floor(randomnumber / 4)][randomnumber % 4] = 2;
      break;
    }
  }
  return array;
}
//获得手指移向的位置，分别1，2，3，4表示 上，下，左，右。
function getdirection(start, end) {
  if (Math.abs(start[0] - end[0]) - Math.abs(start[1] - end[1]) > 0) {
    if (start[0] > end[0]) {
      return 3;
    }
    else {
      return 4;
    }
  }
  else {
    if (end[1] > start[1]) {
      return 2;
    }
    else {
      return 1;
    }
  }
}
//根据位置改变数组，将改变的情况分为两种，一种是上下移动，一种是左右移动。
function changearray(numbers, direction) {
  if(direction==1||direction==2){
    //dir是指正方向和反方向，1为正
    var dir = (direction==1)?1:-1;
    for (var i in numbers){
      //vsortacol函数，一个处理上下移动每行移动的递归函数，在代码最下面
      vsortacol(numbers,parseInt(i)+1,dir);
    }
  }
  else{
    var dir = (direction==3)?1:-1;
    for (var i in numbers[0]){
      hsortacol(numbers,i+1,dir);
    }
  }
  return numbers;
}



module.exports.insertone = insertone;
module.exports.changearray = changearray;
module.exports.getdirection = getdirection;

//i是指处理了几行（不是处理到了数组的第几行）和分别上下移动没有关系，上下移动的区别在于col变量(经过direction和i转换为当前处理的数组行)和direction变量
function vsortacol(array,i,direction) {
  if (i > 1) {
    var col = (direction > 0) ? i - 1 : array.length - i;
    var row = array.length;
    for (var j = 0; j < row; j++) {
      if (array[col][j]) {
        if (array[col - direction][j] == array[col][j]) {
          array[col - direction][j] = array[col][j] * 2;
          array[col][j] = 0;
        }
        else if (array[col - direction][j] == 0) {
          array[col - direction][j] = array[col][j];
          array[col][j] = 0;
        }
      }
    }
    vsortacol(array, i-1, direction);
  }
}
function hsortacol(array, i, direction) {
  if (i > 1) {
    var col = (direction > 0) ? i - 1 : array.length - i;
    var row = array[0].length;
    for (var j = 0; j < row; j++) {
      if (array[j][col]) {
        if (array[j][col - direction] == array[j][col]) {
          array[j][col - direction] = array[j][col] * 2;
          array[j][col] = 0;
        }
        else if (array[j][col - direction] == 0) {
          array[j][col - direction] = array[j][col];
          array[j][col] = 0;
        }
      }
    }
    hsortacol(array, i-1, direction);
  }
}