import { Dictionaries } from "./Dictionaries.js";
import { Queue } from "./Queue.js"
//图表
function Graph(){
  //数组存储顶点、边（对象）
  this.vertexes = [];
  this.edges = new Dictionaries();
}

//添加顶点方法
Graph.prototype.addVertex = function(v){
  this.vertexes.push(v);
  this.edges.set(v,[]);
}

//添加边
Graph.prototype.addEdge = function(v1,v2){
  this.edges.get(v1).push(v2);
  this.edges.get(v2).push(v1);
}

//打印边
Graph.prototype.toString =  function(){
  var point = this.edges.keys();
  console.log(point);
  for(var i = 0; i< point.length;i++){
    console.log(point[i] + "->" + this.edges.get(point[i]));
  }
}

Graph.prototype.initColor = function(){
  var colors = {};
  for(var i=0;i<this.vertexes.length;i++){
    colors[this.vertexes[i]] = "white";
  }
  return colors;
}

Graph.prototype.bfs = function(initV,handler){
  var colors = this.initColor();
  var queue = new Queue();
  //将指定顶点加入队列
  queue.enqueue(initV);
  //判断队列是否为空
  while(!queue.isEmpty()){
    //取出队列顶点
    var point = queue.dequeue();
    //准备找邻点标记顶点为灰色
    
    var pointTo = this.edges.get(point);
    colors[point] = "gray";
    
    //2.遍历取出的点
    for(var i = 0;i<pointTo.length;i++){
      if(colors[pointTo[i]] === "white"){
        queue.enqueue(pointTo[i]);
      }
    }
    
    //找完邻点标记顶点为黑色
    colors[point] = "black";
    handler(point);
  }
}

Graph.prototype.dfs = function(initV,handler){
  var colors = this.initColor();
  this.dg(initV,handler,colors);
}

Graph.prototype.dg = function(initV,handler,colors){
  colors[initV] = "gray";
  console.log(colors);
  handler(initV);
  var pointTo = this.edges.get(initV);
  for(var i=0;i<pointTo.length;i++){
    if(colors[pointTo[i]] === "white"){
      this.dg(pointTo[i],handler,colors);
    }
  }
  colors[initV] = "black";
}