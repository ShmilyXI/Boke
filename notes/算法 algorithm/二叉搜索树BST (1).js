function BinarySearchTree() {
  const Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  let root = null;
  const insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode)
      }
    }
  }
  const inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key)
      inOrderTraverseNode(node.left, callback);
      inOrderTraverseNode(node.right, callback);
    }
  }
  const preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      preOrderTraverseNode(node.left, callback);
      callback(node.key)
      preOrderTraverseNode(node.right, callback);
    }
  }
  const postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key)
    }
  }
  const minNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key;
    }
    return null;
  }
  const maxNode = function (node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key;
    }
    return null;
  }
  const searchNode = function (node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  }
  const findMinNode = function (node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node
  }
  const removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return null;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key)
      return node;
    }
  }
  this.insert = function (key) {
    const node = new Node(key);
    if (root === null) {
      root = node;
    } else {
      insertNode(root, node)
    }
  }
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback);
  }
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback);
  }
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback);
  }
  this.min = function () {
    return minNode(root);
  }

  this.max = function () {
    return maxNode(root);
  }

  this.search = function (key) {
    return searchNode(root, key);
  }

  this.remove = function (key) {
    root = removeNode(root, key);
  }

  this.print = function () {
    console.log(JSON.stringify(root))
  }
}
function AdelsonVelskiiLandi() {
  const Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  let root = null;
  const heightNode = function (node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    }
  }
  const rotationRR = function (node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }
  const insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode)
      }
    }
  }
  const inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key)
      inOrderTraverseNode(node.left, callback);
      inOrderTraverseNode(node.right, callback);
    }
  }
  const preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      preOrderTraverseNode(node.left, callback);
      callback(node.key)
      preOrderTraverseNode(node.right, callback);
    }
  }
  const postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key)
    }
  }
  const minNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key;
    }
    return null;
  }
  const maxNode = function (node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key;
    }
    return null;
  }
  const searchNode = function (node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  }
  const findMinNode = function (node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node
  }
  const removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return null;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key)
      return node;
    }
  }
  this.insert = function (key) {
    const node = new Node(key);
    if (root === null) {
      root = node;
    } else {
      insertNode(root, node)
    }
  }
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback);
  }
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback);
  }
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback);
  }
  this.min = function () {
    return minNode(root);
  }

  this.max = function () {
    return maxNode(root);
  }

  this.search = function (key) {
    return searchNode(root, key);
  }

  this.remove = function (key) {
    root = removeNode(root, key);
  }

  this.print = function () {
    console.log(JSON.stringify(root))
  }
}
function printNode(value) {
  console.log(value);
}
var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
tree.insert(1);
// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);//11,7,5,3,6,9,8,10,18,13,12,14,20,25,100
// tree.postOrderTraverse(printNode);//11,7,5,3,6,9,8,10,18,13,12,14,20,25,100

// tree.remove(3);


tree.print()
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// tree.insert(6);
// tree.inOrderTraverse(printNode);//3，5，6，7，8，9，10，11，12，13，14，15，18，20，25
// tree.remove(15);
// console.log("--------------")
// tree.inOrderTraverse(printNode);//3，5，6，7，8，9，10，11，12，13，14，18，20，25
// tree.insert(100);
// console.log("--------------");
// tree.inOrderTraverse(printNode);//3，5，6，7，8，9，10，11，12，13，14，18，20，25，100
// console.log(tree.min(), "min");//3，“min”
// console.log(tree.max(), "max");//100,"max"
// console.log(tree.search(66))//false
// console.log(tree.search(8))//true

// console.log("--------------");
// tree.preOrderTraverse(printNode);//11,7,5,3,6,9,8,10,18,13,12,14,20,25,100
// console.log("--------------");
// tree.postOrderTraverse(printNode);//3,6,5,8,10,9,7,12,14,13,100,25,20,18,11