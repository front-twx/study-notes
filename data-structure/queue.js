function Queue(){
  this.items = [];
}

//入队 从屁股上增加数据
Queue.prototype.enqueue = function (el){
  this.items.push(el);
  return true;
}

//出队
Queue.prototype.dequeue = function (){
  return this.items.shift();
}

//判断是否为空
Queue.prototype.isEmpty = function(){
  return this.items.length === 0;
}
