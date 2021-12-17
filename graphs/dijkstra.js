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
      this.values[idx] = parent; // swap the element value with the parent
      idx = parentIdx; // change the original index to where the parent was and start the loop over again
    }
  }

  // REMOVE THE HIGHEST PRIORITY FROM THE HEAP
  dequeue() {
    const min = this.values[0]; // get the first element
    const end = this.values.pop(); // pop off the last element because we want to swap it with the min

    if (this.values.length > 0) {
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
        this.values[idx] = this.values[swap]; // swap the initial value at the initial index with the value at the swap index we found in the while loop
        this.values[swap] = element; // change the value at the swap index to the initial element we grabbed
        idx = swap; // the starting index is now equal to where we just completed the swap so we can continue "percolating"
      }
    }
  }
}

// create a weighted graph which means the edges will have varying weights on them
class WeightedGraph {
  constructor() {
    this.adjacencyList = {}; // create our adjacencyList
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []; // if the vertex provided is not in the adjacencyList, then we will add it and set its value to an empty array
  }

  addEdge(vertex1, vertex2, weight) {
    // since this is a weighted graph, when we add an edge, we have to take two vertexes and a weight value
    this.adjacencyList[vertex1].push({ node: vertex2, weight }); // now we add to the array for the first vertex in the adjacencyList the node it is attached to and the provided weight
    this.adjacencyList[vertex2].push({ node: vertex1, weight }); // now we add to the array for the first vertex in the adjacencyList the node it is attached to and the provided weight
  }

  // dijsktra's algorithm - the goal is to find the shortest path between the provided vertexes
  dijkstra(start, finish) {
    const nodes = new PriorityQueue(); // instantiate our priority queue to keep track of the next node we need to investigate
    const distances = {}; // will be used to keep track of how much distance between the provided starting vertex and each vertex in the graph
    const previous = {}; // will keep track of how we got to each vertex based on the shortest distances we are keeping track of in the "distances" object
    let path = []; // we will return this at the end. for now we initialize an empty array. this will ultimately show us which vertexes create the shortest path
    let smallest; // initialize a smallest variable which we will use as the dequeued vertex in the main while loop. we set it up here so that we don't have to initialize each time in the loop

    // build the initial state of the distances object. our goal here is to have all of the vertexes in the adjacency list equal to Infinity, except the starting vertex which will be equal to 0
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        // if the vertex is the same as the provided start vertex then set its value to 0
        distances[vertex] = 0; // set vertex to 0
        nodes.enqueue(vertex, 0); // add vertex to priority queue and set its priority to 0 (which means its priority is "very high" since our priorityQueue is using a minHeap)
      } else {
        // otherwise set all of the other vertexes that are not the starting vertex to Infinity. we set it to Infinity because we want to find the shortest path so whatever path we find to
        // eventually replace it, we know that it will be less than Infinity which helps our logic
        distances[vertex] = Infinity; // set vertex to Infinity
        nodes.enqueue(vertex, Infinity); // add vertex to priority queue and set is priority to Infinity
      }

      previous[vertex] = null; // start the "previous" object which will keep track of where the previous vertex is for each vertex with the shortest path. we will set them all to null initially
    }

    while (nodes.values.length) {
      // as long as there is something to visit
      smallest = nodes.dequeue().val; // get the highest priority item from the priority queue and set it to smallest
      if (smallest === finish) {
        // WE ARE DONE
        while (previous[smallest]) {
          // when we get back to the start we will hit null so the loop will stop which means we will not add the start vertex to our path array but we will add it later
          // we are essentially creating the shortest path we just found but backwards.
          path.push(smallest);
          smallest = previous[smallest];
        }
        break; // break out of the while loop since we found our shortest path
      }

      if (smallest || distances[smallest] !== Infinity) {
        // if the vertex we just dequeued is equal to Infinity or its neighbor is equal to Infinity, we still have work to do
        for (let neighbor in this.adjacencyList[smallest]) {
          // loop through each neighbor in the list of neighbors for "smallest"
          let nextNode = this.adjacencyList[smallest][neighbor]; // since we used "for in" loop, the "neighbor" variable is an index so in order to set the nextNode we need the neighbor list for "smallest" then grab the vertex with the index of "neighbor"
          let candidate = distances[smallest] + nextNode.weight; // it isn't guaranteed that this value will be smaller so we set it as "candidate" because it could be. to ge the value we take the distance (weight) for "smallest" then add the distance (weight) for the nextNode we just grabbed one line above
          let nextNeighbor = nextNode.node; // create a variable for the next neighbor which we will use in the conditional below

          if (candidate < distances[nextNeighbor]) {
            // check if the candidate is actually less than what is currently stored for distance to the next neighbor
            distances[nextNeighbor] = candidate; // if it is less, change the value for that vertex to the candidate value
            previous[nextNeighbor] = smallest; // update the previous object so that we change the vertex for how we got to the nextNeighbor to the vertex that came from the shortest distance
            nodes.enqueue(nextNeighbor, candidate); // enqueue the nextNeighbor to our priority queue and set its priority to the candidate variable (which is equal to the distance we already calculated from start vertex and add the additional distance for the vertex we are currently at)
          }
        }
      }
    }

    return path.concat(smallest).reverse(); // since our path is missing the starting vertex, we concatenate it to the end, then reverse the whole thing so it looks like we are going from start to finish
  }
}

const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

graph.dijkstra("A", "E");
