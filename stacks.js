class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // add node to the beginning of the stack
  push(val) {
    const newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      let temp = this.first;
      this.first = newNode;
      newNode.next = temp;
    }

    this.size++;
    return this.size;
  }

  // remove node from top of stack
  pop() {
    if (!this.first) return null;

    let temp = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first.next;

    this.size--;
    return temp.value;
  }
}
