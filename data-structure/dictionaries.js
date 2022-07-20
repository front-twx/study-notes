//字典
function Dictionaries(){
  this.items = {};
}

//设置key-value
Dictionaries.prototype.set = function (key,value){
  this.items[key] = value;
}

//判断key是否存在
Dictionaries.prototype.has = function(key){
  return this.items.hasOwnProperty(key);
}

//删除key
Dictionaries.prototype.remove = function(key){
  if(!this.has(key)) return false;
  delete this.items[key];
  return true;
}

//获取value
Dictionaries.prototype.get = function(key){
  if(!this.has(key)) return false;
  return this.items[key]
}

//获取所有keys
Dictionaries.prototype.keys = function(){
  return Object.keys(this.items);
}