# JavaScript代码片段

### 1.生成类似[1-100]这样的数组

```js
// fill
const arr = new Array(100).fill(0).map((e,i)=>i+1);
// Array.from()
const arr = Array.from(Array(100),(e,i)=>i+1);
// Array.from() + arr.keys()
const arr = [...Array(100).keys()]
```

### 2.数组结构赋值应用

```js
// 交换变量
[a,b] = [b,a];
[o.a,o.b] = [o.b,o.a];
// 生成剩余数组
const [a,...rest] = [...'a,b,c,d']; // a:'a',rest:['b','c','d']
```

### 3.数组取交集

```js
const a = [0, 1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7, 8];
const duplicatedValues = [...new Set(a)].filter(e=>b.includes(e)); // [3,4,5]
```

### 4.数组取差值

```js
const a = [0, 1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7, 8];
const diffValues = [...new Set([...a,...b])].filter(e=>!a.includes(e)||!b.includes(e)); // [0,1,2,6,7,8]
```

### 5.发布订阅模式

```js
const EventEmit = function() {
  this.events = {};
  this.on = function(name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb);
    } else {
      this.events[name] = [cb];
    }
  };
  this.trigger = function(name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach(eventListener => {
        eventListener(...arg);
      });
    }
  };
};
// on原理就是将callback存储在一个内部变量的特定key下，这是订阅，trigger的原理就是触发对应key，遍历调用内部变量中对应key里面的方法，这是发布。
```

### 删除目录下所有的node_modules文件

```bash
find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
```



