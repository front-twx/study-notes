//vue原理分析
export class Observer{
  constructor(value){
    this.value = value; //对外部属性进行初始化
    if(Array.isArray(value)){
      //数组的逻辑
      
    } else {
      //对象的逻辑
      this.walk(value);
    }
  }
  
  walk(obj){
    //{name: '小明',age : 18}
    const keys = Object.keys(obj);
    for(let i =0 ;i < keys.length; i++){
      defineReactive(obj,keys[i]);
    }
  }
}

//循环 让对象的每一个属性变成可观测
function defineReactive(obj,key,val){
  if(arguments.length === 2){
    val = obj[key];
  }
  
  if(typeof val === "object"){
    //递归
    new Observer(val);
  }
  
  Object.defineProperty(obj,key,{
    enumerable: true, //可枚举
    configurable: true, //可改变
    get(){
      console.log(`${key}属性被读取`);
      return val;
    },
    set(newVal) {
      console.log(`${key}属性被修改了，新值${newVal}`);
      val = newVal;
    }
  });
}