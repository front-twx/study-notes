//哈希表也叫散列表（二维数组），根据关键码值(key,value)而直接进行访问的数据结构。
//若关键字为k，则其值存放在f(k)的存储位置上。由此，不需比较便可直接取得所查记录。
//称这个对应关系f为散列函数，按这个思想建立的表为散列表。
type Entry = {
  key: string,
  value: any,
};

type ListNode = {
  value: Entry,
  next?: ListNode
};
export class HashTable<T>{
  private table: Array<ListNode | undefined> = [];
  private size: number = 0;
  private count: number = 0;
  constructor(size = 7){
    this.table  = [];
    this.size = size;
  }
  
  //哈希函数--将字符串转换为哈希化的数字：元素存储位置的下标
  public hashFunc(string: string, size: number): number{
    let hashCode: number = 0 ;
    //霍纳法则
    for(let i = 0; i < string.length; i++){
      hashCode = 37 * hashCode + string.charCodeAt(i);
    }
    return hashCode % size;
  }
  
  public set(key:string,value:any):void{
    let index: number = this.hashFunc(key,this.size);
    let bucket = this.table[index];
    if(!bucket){
      //为空
      this.table[index] = {
        value: { key,value}
      };
      this.count++;
    }else {
      while(bucket.next){
        bucket = bucket?.next;
      }
      bucket.next = {
        value:{key,value}
      };
      this.count++;
    }
  }
  
  public get(key:string):any{
    let index = this.hashFunc(key,this.size);
    let bucket = this.table[index];
    while(bucket){
      if(bucket.value.key === key){
        return bucket.value.key;
      }
      bucket = bucket.next;
    }
  }

  public has(key:string):boolean{
    let index = this.hashFunc(key,this.size);
    let bucket = this.table[index];
    while(bucket){
      if(bucket.value.key === key){
        return true;
      }
      bucket = bucket.next;
    }
    return false;
  }
  
  public delete(key: string): any{
    if(this.has(key)){
      return null;
    } else {
      let index:number = this.hashFunc(key,this.size); 
      let bucket = this.table[index];
      let preListNode: any = {
        value:{key: "",value: ""},
        next: bucket
      }
      let p: any = preListNode;
      while(preListNode){
        if(preListNode.next.value.key === key){
          preListNode.next = preListNode.next.next;
          this.count--;
          return bucket;
        }
        preListNode = p.next;
      }
    }
  }
  
  public isEmpty():boolean{
    return this.count === 0;
  }
  
  public total():number {
    return this.count;
  }
  
  // 当 count 的数量超过 size 数量的 75% 时，就需要给哈希表扩容。以减少发生冲突的可能性。
  // 反之，当count 的数量小于 size 数量的 25%，我们就需要缩小哈希表的容量，避免空间的大量浪费
  
  //扩容
  public resize(newSize):void{
    //保存旧数组的内容
    let oldtable = this.table;
    //重置属性
    this.table = [];
    this.count = 0;
    this.size = newSize;
    //遍历旧数组的内容
    oldtable.forEach(item=>{
      if(Array.isArray(item) && item.length > 0){
        item.forEach(e=>{
          this.set(e.key,e.value);
        });
      }
    });
  }
  
  //判断某个数字是否是质数
  public isPrime(num):boolean{
    for (let i = 2; i < num; i++) {
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