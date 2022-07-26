Web Worker 使其他工作线程独立于主线程之外执行。适用于那些处理纯数据或与浏览器UI无关的长时间运行脚本。
创建一个新的 worker 很简单，指定一个脚本的 URI 来执行 worker 线程（main.js）：

```javascript
var myWorker = new Worker('worker.js');
//通过postMessage()方法和onmessage事件向worker发送消息。
first.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}

second.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}
```

在 worker 中接收到消息后，我们可以写一个事件处理函数代码作为响应（worker.js）：

```javascript
onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}
```

onmessage处理函数在接收到消息后马上执行，代码中消息本身作为事件的data属性进行使用。这里我们简单的对这2个数字作乘法处理并再次使用postMessage()方法，将结果回传给主线程。

回到主线程，我们再次使用onmessage以响应worker回传的消息：

```javascript
myWorker.onmessage = function(e) {
  result.textContent = e.data;
  console.log('Message received from worker');
}
```

在这里我们获取消息事件的data，并且将它设置为result的textContent，所以用户可以直接看到运算的结果。

不过在worker内，不能直接操作DOM节点，也不能使用window对象的默认方法和属性。然而你可以使用大量window对象之下的东西，包括WebSockets，IndexedDB以及FireFox OS专用的Data Store API等数据存储机制。