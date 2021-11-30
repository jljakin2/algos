class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // add node to doubly linked list
  push(val) {
    let newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  // remove node from end of doubly linked list
  pop() {
    if (!this.head) return undefined;

    let poppedNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }

    this.length--;
    return poppedNode;
  }

  // remove node from beginning of doubly linked list
  shift() {
    if (!this.head) return undefined;

    let oldHead = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }

    this.length--;
    return oldHead;
  }

  // add node to beginning of doubly linked list
  unshift(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  // find node at specific index in doubly linked list
  get(index) {
    if (index < 0 || index >= this.length) return null;

    if (index <= this.index / 2) {
      let current = this.head;
      let count = 0;

      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      let current = this.tail;
      let count = this.length - 1;

      while (count !== index) {
        current = current.prev;
        count--;
      }
    }

    return current;
  }

  // find node by index and replace with new value
  set(index, val) {
    let foundNode = this.get(index);

    if (foundNode != null) {
      foundNode.val = val;
      return true;
    }

    return false;
  }

  // insert node at specific index
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);

    const newNode = new Node(val);

    // define the nodes that will surround the newNode
    let beforeNode = this.get(index - 1);
    let afterNode = beforeNode.next;

    // connect all nodes with newNode
    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;

    this.length++;
    return true;
  }

  // removes node from specific index
  remove(index) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return !!this.shift();
    if (index === this.length - 1) return !!this.pop();

    // find node to be removed
    let removedNode = this.get(index);

    // define the nodes that surround the removed node
    let beforeNode = removedNode.prev;
    let afterNode = removedNode.next;

    // remove all connections from the removed node and link the before and after together
    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    removedNode.next = null;
    removedNode.prev = null;

    this.length--;
    return removedNode;
  }
}

const list = new DoublyLinkedList();

list.push("Why");
list.push("So");
list.push("Serious");

console.log(list);
