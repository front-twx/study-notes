// 1、初始化 patch(container,vnode)
// 2、更新 update(vnode,newVnode)

//虚拟dom三个要素：目标元素（不可缺），属性，子节点

function createElement(vnode) {
  let tag = vnode.tag; //目标元素
  let attrs = vnode.attrs; //属性
  let children = vnode.children || []; //子节点
  
  if(!tag){
    return null;
  }
  //1.创建对应的dom
  let elem = document.createElement(tag);
  let attrName;
  //2.给dom添加属性
  for(attrName in attrs){
    if(attrs.hasOwnProperty(attrName)){
      elem.setAttribute();
    }
  }
  
  //3.将子元素添加到目标之上
  children.forEach(function(childVnode){
    elem.appendChild(createElement(childVnode));
  });
  return elem;
}

function updateChildren(vnode,newVnode){
  let children = vnode.children || []; //现有节点
  let newChildren = newVnode.children || []; //新节点
  children.forEach(function(childrenVnode,index){
    //循环的每一项
    let newChildrenVnode = newChildren[index];
    //第一次没有变化
    if(childrenVnode.tag === newChildrenVnode.tag){
      //深层次对比
      updateChildren(childrenVnode,newChildrenVnode);
    }else {
      //有变化 tag不一样
      replaceNode(childrenVnode,newChildrenVnode);
    }
  })
}