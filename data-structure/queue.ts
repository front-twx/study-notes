//队列：先进先出；javascript的事件任务队列就是基于队列
//无论栈还是队列不允许从中间插入元素

export default class Queue<T>{
  private queue: Array<T> = [];
  constructor(){
    this.queue = [];
  }
  
  //进队
  public enqueue(element:T):Array<T>{
    this.queue.push(element);
    return this.queue;
  }
  
  //出队
  public dequeue():any{
    return this.queue.shift();
  }
  
  //获取队列长度
  public getSize():number{
    return this.queue.length;
  }
  
  //判断是否为空
  public isEmpty(): boolean {
    return this.queue.length === 0;
  }
  
  //获取队首元素
  public getFirst():T{
    return this.queue[0];
  }
  
  //清空队列
  public clear(): void{
    this.queue = [];
  }
}