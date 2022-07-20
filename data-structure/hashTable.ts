//哈希表也叫散列表（二维数组），根据关键码值(key,value)而直接进行访问的数据结构。
//若关键字为k，则其值存放在f(k)的存储位置上。由此，不需比较便可直接取得所查记录。
//称这个对应关系f为散列函数，按这个思想建立的表为散列表。

class HashTable<T>{
  private storage: Array<T> = [];
  private size: number = 0;
  private count: number = 0;
  constructor(size = 7){
    this.storage  = [];
    this.size = size;
    this.count = 0;
  }
  
  //哈希函数
  public hashFunc(string,size): number{
    let hashCode = 0 ;
    //霍纳法则
    for(var i = 0; i < string.length; i++){
      hashCode = 37 * hashCode + string.charCodeAt(i);
    }
    return hashCode % size;
  }
  
  public put(key,value):null{
    let index  = this.hashFunc(key,this.size);
    if(!this.storage[index]){
      //为空
      let butket = [{key,value}];
      this.storage[index] = butket;
      this.count++;
    }else {
      let obj = this.storage[index].find(ele=>ele.key === key);
      if(obj){
        obj.value = value;
      }else {
        this.storage[index].push({key,value});
        this.count++;
      }
    }
  }
  
  public get(key):T | null{
    let index = this.hashFunc(key,this.size);
    if(!this.storage[index]){
      return null;
    }else {
      let obj = this.storage[index].find(ele=>ele.key === key);
      return obj || null;
    }
  }
  
  public remove(key):Array<T> | null{
    if(!this.get(key)){
      return null;
    }else {
      let index = this.storage[index].findIndex(ele=>ele.key === key);
      const removedEle = this.storage[index].splice(index,1);
      this.count--;
      return removedEle;
    }
  }
  
  public isEmpty():boolean{
    return this.count === 0;
  }
  
  public count():number {
    return this.count;
  }
  
  //扩容
  public resize(newSize):null{
    //保存旧数组的内容
    let oldStorage = this.storage;
    //重置属性
    this.storage = [];
    this.count = 0;
    this.size = newSize;
    //遍历旧数组的内容
    oldStorage.forEach(item=>{
      if(item && item.length > 0){
        item.forEach(e=>{
          this.put(e.key,e.value);
        });
      }
    });
  }
  
  //判断某个数字是否是质数
  public isPrime(num):boolean{
    for (const i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  
  //获取质数的方法
  public getPrime(num):number{
    while (!this.isPrime(num)) {
      num++
    }
    return num;
  }
}