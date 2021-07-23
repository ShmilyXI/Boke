function Queue() {
  let items = [];
  this.enQueue = function (item) {
    items.push(item);
  }
  this.deQueue = function () {
    return items.shift();
  }
  this.front = function () {
    return items[0];
  }
  this.isEmpty = function () {
    return items.length === 0;
  }
  this.size = function () {
    return items.length;
  }
  this.print = function () {
    console.log(items.toString())
  };
}

// let queue = new Queue();
// queue.enQueue(1)
// queue.enQueue(2)
// queue.enQueue(3)
// queue.enQueue(4)
// queue.print()
// console.log(queue.deQueue())
// queue.print()
// console.log(queue.front())

const Queue2 = (function () {
  const items = new WeakMap();
  class Queue {
    constructor() {
      items.set(this, [])
    }
    enQueue(item) {
      let arr = items.get(this);
      arr.push(item)
    }
    deQueue() {
      let arr = items.get(this);
      return arr.shift()
    }
    front() {
      let arr = items.get(this);
      return arr[0]
    }
    isEmpty() {
      let arr = items.get(this);
      return arr.length === 0
    }
    size() {
      let arr = items.get(this);
      return arr.length;
    }
    print() {
      let arr = items.get(this);
      console.log(arr.toString())
    }
  }
  return Queue;
})()


// let queue = new Queue2();
// queue.enQueue(1)
// queue.enQueue(2)
// queue.enQueue(3)
// queue.enQueue(4)
// queue.print()
// console.log(queue.deQueue())
// queue.print()
// console.log(queue.front())

// 优先队列
function PriorityQueue() {
  let items = [];
  function QueueItem(item, leave = 9) {
    this.item = item;
    this.leave = leave;
  }
  this.enQueue = function (item, leave) {
    let queueItem = new QueueItem(item, leave);
    let added = false;
    for (let i = 0; i < items.length; i++) {
      if (queueItem.leave < items[i].leave) {
        items.splice(i, 0, queueItem);
        added = true;
        break;
      }
    }
    if (!added) {
      items.push(queueItem);
    }
  }
  this.deQueue = function () {
    return items.shift();
  }
  this.front = function () {
    return items[0];
  }
  this.isEmpty = function () {
    return items.length === 0;
  }
  this.size = function () {
    return items.length;
  }
  this.print = function () {
    let arr = items.map(e => `item: ${e.item},leave: ${e.leave}`)
    console.log(arr)
  };

}

// let queue = new PriorityQueue();
// queue.enQueue(1)
// queue.enQueue(2, 2)
// queue.enQueue(3)
// queue.enQueue(4)
// queue.enQueue(5)
// queue.enQueue(6, 1)

// queue.print()
// console.log(queue.deQueue())
// queue.print()
// console.log(queue.front())
function hotPotato(nameList, num) {
  const queue = new Queue();
  //把所有的名单（nameList）依次入列
  for (let i = 0; i < nameList.length; i++) {
    queue.enQueue(nameList[i]);
  }

  //声明当前被淘汰的人员名称
  let eliminated = '';
  //如果队列中的元素大于一个，说明还没有最后的赢家，如果只剩下一个，就出列该最后赢家
  while (queue.size() > 1) {
    //循环当前队列num次，把队列头部的“出列元素”再入列。
    for (let i = 0; i < num; i++) {
      queue.enQueue(queue.deQueue());
    }
    //循环结束后，出列当前队列的元素，也就是淘汰者。
    eliminated = queue.deQueue();
    queue.print();
    console.log(eliminated + "被淘汰");
  }

  return queue.deQueue();
}

let names = ["zak", "zaking", "james", "lili", "bole", "londo", "fali"]
console.log(hotPotato(names, 7))