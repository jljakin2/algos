class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

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
}
