// Implementation of MaxHeap
class MaxBinaryHeap {
  constructor() {
    this.values = []; // where we will keep track of our maxBinaryHeap
  }
  // =============================================================================================================================
  // INSERT INTO HEAP
  insert(element) {
    this.values.push(element); // push whatever value is passed in to the back of the array
    this.bubbleUp(); // use the bubbleUp method to put the newly added element where it needs to in the array
  }

  bubbleUp() {
    let idx = this.values.length - 1; // grab the last element's index
    const element = this.values[idx]; // grab the actual value of the element

    while (idx > 0) {
      // until we are back at the start of the array, keep bubbling up
      let parentIdx = Math.floor((idx - 1) / 2); // get the parent index based on the (n-1)/2 formula
      let parent = this.values[parentIdx]; // get the actual value of the parent index

      if (element <= parent) break; // if the value of the element is less than the value of the parent, the new value has found its proper place

      this.values[parentIdx] = element; // otherwise, swap the parent value with the element
      this.value[idx] = parent; // swap the element value with the parent
      idx = parentIdx; // change the original index to where the parent was and start the loop over again
    }
  }
  // =============================================================================================================================

  // =============================================================================================================================
  // REMOVE THE MAX FROM HEAP
  extractMax() {
    const max = this.values[0]; // get the first element
    const end = this.values.pop(); // pop off the last element because we want to swap it with the max

    if (this.value.length > 0) {
      // handles the edge case when there is only item left in the array
      this.values[0] = end; // sets the first item of the array to what was the last element that we just popped off
      this.sinkDown(); // starts the process of "percolating-down" so the element we just placed at the front, finds its proper place in the heap
    }

    return max;
  }

  sinkDown() {
    let idx = 0; // set the initial index for where sinkDown() will start
    const length = this.values.length; // helps to shorten code
    const element = this.values[0]; // get the actual value of the first item

    while (true) {
      let leftChildIdx = 2 * idx + 1; // find the left index based on taking the current index and putting it through the 2n + 1 formula for left children
      let rightChildIdx = 2 * idx + 2; // find the right index based on taking the current index and putting it through the 2n + 2 formula for right children
      let leftChild, rightChild; // initialize two variables for the actual values of the left and right children but we need to check if the index used to get these values is out of bounds or not
      let swap = null; // variable to keep track of if there were any swaps in the loop which would later mean we keep the loop going

      if (leftChildIdx < length) {
        // is the index for the left child out of bounds of the array
        leftChild = this.values[leftChildIdx]; // since we know we are not out of bounds, we can finally set the actual value of the left child index
        if (leftChild > element) {
          // check if the left child value is greater than the element's value
          swap = leftChildIdx; // if the value is greater, change swap to equal the the index of the left child.
        }
      }

      // we will ultimately keep changing this swap variable to the index of the value that is greater than the current element.
      // left will always be checked first, but later we will check if right is greater than left so we will update the swap variable accordingly.
      // this is where the logic for the while loop comes in: if we find that none of the children are larger or we are out of bounds, then the swap variable will be null and we will exit the loop

      if (rightChildIdx < length) {
        // check that the rightChild index is not out of bounds
        rightChild = this.values[rightChildIdx]; // set the rightChild variable to the actual value at the rightChild index

        // our conditional check for the right child is going to be a bit different now since we have to first check if the rightChild value is larger than the element value, then we have to check if the rightChild value is greater than the leftChild value
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          // 1. is swap still null AND the rightChild is greater than the element
          // OR
          // 2. swap isn't null (which means the leftChild fulfilled the greater than the element condition) AND rightChild is greater than the leftChild

          swap = rightChildIdx; // if either of those is true, we will change the swap variable to the rightChild index
        }

        if (swap === null) break; // if swap is still null at this point, we can break out of the while loop

        // finally! we only get here if the swap value isn't null
        this.value[idx] = this.values[swap]; // swap the initial value at the initial index with the value at the swap index we found in the while loop
        this.value[swap] = element; // change the value at the swap index to the initial element we grabbed
        idx = swap; // the starting index is now equal to where we just completed the swap so we can continue "percolating"
      }
    }
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Implementation of a Priority Queue
// - the main difference between the priority queue and the maxHeap is that with the Priority Queue, we are comparing based on the priority and not the value. Also, the Priority Queue will
// more like a minHeap than a maxHeap since a priority: 1 will be "higher in priority" than a priority: 3.
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = []; // where we will keep track of our maxBinaryHeap
  }
  // =============================================================================================================================
  // INSERT INTO PRIORITY QUEUE
  enqueue(val, priority) {
    let newNode = new Node(val, priority); // create an instance of the node class
    this.values.push(newNode); // push whatever value is passed in to the back of the array
    this.bubbleUp(); // use the bubbleUp method to put the newly added element where it needs to in the array
  }

  bubbleUp() {
    let idx = this.values.length - 1; // grab the last element's index
    const element = this.values[idx]; // grab the actual value of the element

    while (idx > 0) {
      // until we are back at the start of the array, keep bubbling up
      let parentIdx = Math.floor((idx - 1) / 2); // get the parent index based on the (n-1)/2 formula
      let parent = this.values[parentIdx]; // get the actual value of the parent index

      if (element.priority >= parent.priority) break; // if the value of the element is less than the value of the parent, the new value has found its proper place

      this.values[parentIdx] = element; // otherwise, swap the parent value with the element
      this.value[idx] = parent; // swap the element value with the parent
      idx = parentIdx; // change the original index to where the parent was and start the loop over again
    }
  }
  // =============================================================================================================================

  // =============================================================================================================================
  // REMOVE THE HIGHEST PRIORITY FROM THE HEAP
  dequeue() {
    const min = this.values[0]; // get the first element
    const end = this.values.pop(); // pop off the last element because we want to swap it with the min

    if (this.value.length > 0) {
      // handles the edge case when there is only item left in the array of values
      this.values[0] = end; // sets the first item of the array to what was the last element that we just popped off
      this.sinkDown(); // starts the process of "percolating-down" so the element we just placed at the front, finds its proper place in the heap
    }

    return min;
  }

  sinkDown() {
    let idx = 0; // set the initial index for where sinkDown() will start
    const length = this.values.length; // helps to shorten code
    const element = this.values[0]; // get the actual value of the first item

    while (true) {
      let leftChildIdx = 2 * idx + 1; // find the left index based on taking the current index and putting it through the 2n + 1 formula for left children
      let rightChildIdx = 2 * idx + 2; // find the right index based on taking the current index and putting it through the 2n + 2 formula for right children
      let leftChild, rightChild; // initialize two variables for the actual values of the left and right children but we need to check if the index used to get these values is out of bounds or not
      let swap = null; // variable to keep track of if there were any swaps in the loop which would later mean we keep the loop going

      if (leftChildIdx < length) {
        // is the index for the left child out of bounds of the array
        leftChild = this.values[leftChildIdx]; // since we know we are not out of bounds, we can finally set the actual value of the left child index
        if (leftChild.priority < element.priority) {
          // check if the left child priority is less of a priority than the element's priority
          swap = leftChildIdx; // if the leftChild's priority is less, change swap to equal the the index of the left child.
          // REMEMBER: less priority means the value of the priority argument (e.g. 1 is higher priority but a lower number than 3 which would be a lower priority but a higher value). we are going
          // off of the value which ultimately means a "higher priority"
        }
      }

      // we will ultimately keep changing this swap variable to the index of the value that is less of a priority than the current element.
      // left will always be checked first, but later we will check if right is less than left so we will update the swap variable accordingly.
      // this is where the logic for the while loop comes in: if we find that none of the children are smaller priority values or we are out of bounds, then the swap variable will be
      // null and we will exit the loop

      if (rightChildIdx < length) {
        // check that the rightChild index is not out of bounds
        rightChild = this.values[rightChildIdx]; // set the rightChild variable to the actual value at the rightChild index

        // our conditional check for the right child is going to be a bit different now since we have to first check if the rightChild priority values is smaller than the element priority value,
        // then we have to check if the rightChild priority value is less than the leftChild priority value
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          // 1. is swap still null AND the rightChild priority  value is less than the element priority value
          // OR
          // 2. swap isn't null AND rightChild priority value is less than the leftChild priority value

          swap = rightChildIdx; // if either of those is true, we will change the swap variable to the rightChild index
        }

        if (swap === null) break; // if swap is still null at this point, we can break out of the while loop

        // finally! we only get here if the swap value isn't null
        this.value[idx] = this.values[swap]; // swap the initial value at the initial index with the value at the swap index we found in the while loop
        this.value[swap] = element; // change the value at the swap index to the initial element we grabbed
        idx = swap; // the starting index is now equal to where we just completed the swap so we can continue "percolating"
      }
    }
  }
}
