export function LinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
  }
  let length = 0;
  let head = null;

  this.append = function (element) {
    let node = new Node(element);
    let current = null;
    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };

  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element), current = head, previous, index = 0;
      if (position === 0) {
        node.next = current;
        head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  }

  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head, previous, index = 0;
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  }

  this.indexOf = function (element) {
    let current = head, index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  this.remove = function (element) {
    let index = indexOf(element);
    return removeAt(index);
  }

  this.isEmpty = function () {
    return length === 0;
  }

  this.size = function () {
    return length;
  };

  this.getHead = function () {
    return head;
  };

  this.toString = function () {
    let current = head, string = '';
    while (current) {
      string += current.element + (current.next ? ', ' : '');
      current = current.next;
    }
    return string;
  }

  this.print = function () {
    console.log(this.toString())
  }
}

// var list = new LinkedList();

// list.append(1);
// list.append(2);
// list.append(3);
// list.append(4);
// list.append(5);
// list.print(); // 1, 2, 3, 4, 5
// list.insert(2, 99);
// list.print(); // 1, 2, 99, 3, 4, 5
// list.removeAt(1);
// list.print(); // 1, 99, 3, 4, 5

// 双向链表
export function doubleLinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
  let length = 0;
  let head = null;
  let tail = null;

  this.append = function (element) {
    let node = new Node(element);
    let current = null;
    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };

  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element), current = head, previous, index = 0;
      if (position === 0) {
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      length++;
      return true;
    } else {
      return false;
    }
  }

  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head, previous, index = 0;
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  }

  this.indexOf = function (element) {
    let current = head, index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  this.remove = function (element) {
    let index = indexOf(element);
    return removeAt(index);
  }

  this.isEmpty = function () {
    return length === 0;
  }

  this.size = function () {
    return length;
  };

  this.getHead = function () {
    return head;
  };

  this.toString = function () {
    let current = head, string = '';
    while (current) {
      string += current.element + (current.next ? ', ' : '');
      current = current.next;
    }
    return string;
  }

  this.print = function () {
    console.log(this.toString())
  }
}