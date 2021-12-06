class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value in the tree
  insert(value) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (value === current.value) return undefined;
        if (value < current.value) {
          if (current.left === null) {
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }

  // Find a value in the tree
  find(value) {
    if (this.root === null) return false;

    let current = this.root;
    let found = false;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }

    if (!found) return undefined;
    return current;
  }

  // BREADTH FIRST SEARCH
  BFS() {
    let data = [];
    let queue = [];
    let node = this.root;
    queue.push(node);

    while (queue.length) {
      node = queue.shift(); // remove first node from the queue
      data.push(node.value); // using the value makes it easier to see what the data actually is. otherwise, it will be nodes

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }

  // DEPTH FIRST SEARCH
  // PreOrder
  DFSPreOrder() {
    let data = []; // keep track of node.values as they come back from the call stack

    function traverse(node) {
      // helper function that adds the node.value to the data array, then recursively calls itself on the left/right nodes of the current node, if they exist
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root); // kicks off the recursive calls with the root node
    return data;
  }

  // PostOrder
  DFSPostOrder() {
    // exactly the same as preOrder except we add the node.value to the data array after getting to the very bottom element on the left and right
    let data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      // add the node.value after we get to the bottom nodes
      data.push(node.value);
    }

    traverse(this.root);
    return data;
  }
}
