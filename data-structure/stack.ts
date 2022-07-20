//栈：先进后出；可以基于数组封装一个只能使用push和pop方法

class Stack<T>{
  private stack: Array<T> = [];
  constructor(){
    this.stack = [];
  }
  
  //压栈
  public push(element:T): Array<T>{
    this.stack.push(element);
    return this.stack;
  }
  
  //出栈
  public pop(): T | null{
    if(!this.stack.length) return;
    return this.stack.pop();
  }
  
  //获取栈顶元素
  public getTop(): T{
    return this.stack[this.stack.length -1];
  }
  
  //获取栈的长度
  public getSize(): number{
    return this.stack.length;
  }
  
  //判断是否为空
  public isEmpty(): boolean {
    return this.stack.length === 0;
  }
  
  //清空栈
  public clear(): null{
    this.stack = [];
  }
}