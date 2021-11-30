// class to construct node inside of singly linked list class
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // add new item to end of linked list
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // remove last item of linked list
  pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  // remove first item of linked list
  shift() {
    if (!this.head) return undefined;

    let removedHead = this.head;
    this.head = removedHead.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return removedHead;
  }

  // add item to beginning of linked list
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  // get item by position from linked list
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;

    while (counter !== index) {
      current = current.next;
      counter++;
    }

    return current;
  }

  // update item at specific point in linked list
  set(index, val) {
    let foundNode = this.get(index);

    if (foundNode) {
      foundNode.val = val;
      return true;
    }

    return false;
  }

  // add new node at specific point in linked list
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    // note: the "!!" coerces the return of the entire list into a boolean
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);

    // set up new/changing variables
    let newNode = new Node(val);
    let prev = this.get(index - 1);
    let temp = prev.next;

    // now all of the changes
    prev.next = newNode;
    newNode.next = temp;

    this.length++;
    return true;
  }

  // remove item at specific point in linked list
  remove(index) {
    if (index < 0 || index > this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    // set up new/changing variables
    let previousNode = this.get(index - 1);
    let removed = previousNode.next;

    // make changes
    previousNode.next = removed.next;

    this.length--;

    return removed;
  }

  // reverse the entire linked list
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
    }
  }
}

const list = new SinglyLinkedList();

list.push("Yo");
list.push("Hello");
list.push("Goodbye");
list.push("Sir");

list.reverse();
