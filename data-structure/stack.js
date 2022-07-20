function Stack(){
  this.items = [];
}

//入栈
Stack.prototype.push = function (el){
  this.items.push(el);
  return true;
}

//出栈
Stack.prototype.pop = function (){
  return this.items.pop();
}

//获取栈顶元素
Stack.prototype.getTop = function (){
  return this.items[this.items.length -1];
}

//获取栈的长度
Stack.prototype.getSize = function (){
  return this.items.length;
}


//判断是否为空
Stack.prototype.isEmpty = function(){
  return this.items.length === 0;
}
