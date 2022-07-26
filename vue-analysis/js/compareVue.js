//1、双向数据绑定原理发生了改变
//vue2利用Object.defineProperty()对数据进行劫持，结合发布订阅模式实现
Object.defineProperty(vm,'msg',{
  enumerable:true,
  configurable: true,
  //获取值的时候执行
  get(){
    console.log('get: ',data.msg);
    return data.msg;
  },
  //设置值的时候执行
  set(newValue){
    console.log('set:',newValue);
    if(newValue === data.msg){
      return;
    }
    dat.msg = newValue;
    //数据更改，更新DOM的值
    document.querySelector('#app').textContent = data.msg;
  }
});

//vue3使用Proxy对数据代理；
let vm = new Proxy(data,{
  //执行代理行为
  get(target,key){
    console.log('get,key:',key,target[key]);
    return target[key];
  },
  set(target,key,newValue){
    console.log('set,key: ',key,newValue)
    if(target[key] === newValue){
      return;
    }
    target[key] = newValue;
    document.querySelector('#app').textContent = target[key];
  }
});

// defineProperty只能监听某个属性，不能对全对象监听
// proxy可以省去for in、闭包等内容提升效率；
// 可以监听数组，不用再单独对数组做特异性操作，可以检测到数组内部数据变化

// 2、3.x默认进行懒观察（lazy observation）。
//   2.x 版本，不管数据多大，都会在一开始就为其创建观察者。当数据很大时，这可能会在页面载入时造成明显的性能压力。
//   3.x 版本，只会对[被用于渲染初始可见部分的数据]创建观察者，而且 3.x 的观察者更高效。

// 3、更精准的变更通知。
// 比例来说：2.x 版本中，使用 Vue.set来给对象新增一个属性时，这个对象的所有 watcher都会重新运行；
// 3.x 版本中，只有依赖那个属性的 watcher才会重新运行；
