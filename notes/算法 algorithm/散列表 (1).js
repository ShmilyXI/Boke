// import { LinkedList } from './链表.js';

function LinkedList() {
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

function HashMap() {
  const list = [];
  const loseloseHashCode = key => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    };
    return hash % 37;
  }

  this.put = (key, value) => {
    const index = loseloseHashCode(key);
    console.log(index + '-' + key)
    list[index] = value;
  }

  this.get = (key) => list[loseloseHashCode(key)];
  this.remove = (key) => list[loseloseHashCode(key)] = undefined;

  this.print = () => {
    for (var i = 0; i < list.length; i++) {
      // 大家可以把这里的判断去掉，看看到底是不是松散的数组结构。
      if (list[i] !== undefined) {
        console.log(i + ":" + list[i]);
      }
    }
  }
}
// var hash = new HashMap();
// hash.put("Gandalf", 'www.gandalf.com');
// hash.put("John", 'www.john.com');
// hash.put("Tyrion", 'www.tyrion.com');
// hash.print()

function SeparateHashMap() {
  const list = [];
  const loseloseHashCode = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    };
    return hash % 37
  }
  const ValuePair = function (key, value) {
    this.key = key;
    this.value = value;
    this.toString = () => `[${this.key}-${this.value}]`
  }
  this.put = function (key, value) {
    const position = loseloseHashCode(key);
    if (list[position] === undefined) {
      list[position] = new LinkedList();
    }
    list[position].append(new ValuePair(key, value))
  }
  this.get = function (key) {
    const position = loseloseHashCode(key);
    if (list[position] !== undefined) {
      let current = list[position].getHead();
      while (current) {
        if (current.element.key === key) {
          return current.element.key;
        }
        current = current.next;
      }
      if (current.element.key === key) {
        return current.element.key;
      }
    }
    return undefined;
  }
  this.remove = function (key) {
    var position = loseloseHashCode(key);

    if (list[position] !== undefined) {
      var current = list[position].getHead();
      while (current.next) {
        if (current.element.key === key) {
          list[position].remove(current.element);
          if (list[position].isEmpty()) {
            list[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      if (current.element.key === key) {
        list[position].remove(current.element);
        if (list[position].isEmpty()) {
          list[position] = undefined;
        }
        return true;
      }
    }

    return false;
  };
  this.print = function () {
    for (var i = 0; i < list.length; i++) {
      // 大家可以把这里的判断去掉，看看到底是不是松散的数组结构。
      if (list[i] !== undefined) {
        console.log(i + ":" + list[i]);
      }
    }
  }
}
// var separateHash = new SeparateHashMap();
// separateHash.put("Gandalf", 'www.Gandalf.com');//19-Gandalf
// separateHash.put("John", 'www.John.com');//29-John
// separateHash.put("Tyrion", 'www.Tyrion.com');//16-Tyrion
// separateHash.put("Aaron", 'www.Aaron.com');//16-Aaron
// separateHash.put("Donnie", 'www.Donnie.com');//13-Donnie
// separateHash.put("Ana", 'www.Ana.com');//13-Ana
// separateHash.put("Jonathan", 'www.Jonathan.com');//5-Jonathan
// separateHash.put("Jamie", 'www.Jamie.com');//5-Jamie
// separateHash.put("Sue", 'www.Sue.com');//5-Sue
// separateHash.put("Mindy", 'www.Mindy.com');//32-Mindy
// separateHash.put("Paul", 'www.Paul.com');//32-Paul
// separateHash.put("Nathan", 'www.Nathan.com');//10-Nathan

// separateHash.print();
function LinearHashMap() {
  const list = [];
  const loseloseHashCode = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    };
    return hash % 37
  }
  const djb2HashCode = (key) => {
    let hash = 5813;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013
  }
  const ValuePair = function (key, value) {
    this.key = key;
    this.value = value;
    this.toString = () => `[${this.key}-${this.value}]`
  }
  this.put = function (key, value) {
    let position = loseloseHashCode(key);
    if (list[position] === undefined) {
      list[position] = new ValuePair(key, value);
    } else {
      let index = ++position;
      while (list[index] !== undefined) {
        index++;
      }
      list[index] = new ValuePair(key, value);
    }
  }
  this.get = function (key) {
    let position = loseloseHashCode(key);
    if (list[position] !== undefined) {
      if (list[position].key === key) {
        return list[position].value;
      } else {
        let index = ++position;
        while (list[index] === undefined || list[index].key !== key) {
          index++;
        }
        if (list[index].key === key) {
          return list[index].value;
        }
      }
    }
    return undefined
  }
  this.remove = function (key) {
    var position = loseloseHashCode(key);

    if (list[position] !== undefined) {
      if (list[position].key === key) {
        list[index] = undefined;
      } else {
        var index = ++position;
        while (list[index] === undefined || list[index].key !== key) {
          index++;
        }
        if (list[index].key === key) {
          list[index] = undefined;
        }
      }
    }
    return undefined;

  };

  this.print = function () {
    for (var i = 0; i < list.length; i++) {
      // 大家可以把这里的判断去掉，看看到底是不是松散的数组结构。
      if (list[i] !== undefined) {
        console.log(i + ":" + list[i]);
      }
    }
  }
}

var linearHash = new LinearHashMap();
linearHash.put("Gandalf", 'www.Gandalf.com');//19-Gandalf
linearHash.put("John", 'www.John.com');//29-John
linearHash.put("Tyrion", 'www.Tyrion.com');//16-Tyrion
linearHash.put("Aaron", 'www.Aaron.com');//16-Aaron
linearHash.put("Donnie", 'www.Donnie.com');//13-Donnie
linearHash.put("Ana", 'www.Ana.com');//13-Ana
linearHash.put("Jonathan", 'www.Jonathan.com');//5-Jonathan
linearHash.put("Jamie", 'www.Jamie.com');//5-Jamie
linearHash.put("Jamie", 'www.Jamie.com');//5-Jamie
linearHash.put("Sue", 'www.Sue.com');//5-Sue
linearHash.put("Mindy", 'www.Mindy.com');//32-Mindy
linearHash.put("Paul", 'www.Paul.com');//32-Paul
linearHash.put("Nathan", 'www.Nathan.com');//10-Nathan

linearHash.print();
console.log(linearHash.get("Paul"));
console.log(linearHash.remove("Mindy"));
linearHash.print();