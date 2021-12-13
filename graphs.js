class Graph {
  constructor() {
    this.adjacencyList = {}; // set up our adjacency list which will add vertexes as the keys and the values will be whatever that vertex connects to
  }

  // add a vertex to our graph
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      // if there isn't already a key with the value of the provided vertex
      this.adjacencyList[vertex] = []; // create the key with the value of the vertex in the adjacency list and set it equal to an empty array which is where we are going to keep its connections
    }
  }

  // add new edge to our graph
  addEdge(v1, v2) {
    // takes in two vertexes
    // NOTE: this is a very basic implementation. it doesn't have error checking for vertex types and already existing edges. REMEMBER to add those in when interviewing
    this.adjacencyList[v1].push(v2); // find the first vertex in the adjacency list and push the second vertex to its array
    this.adjacencyList[v2].push(v1); // find the second vertex in the adjacency list and push the first vertex to its array
  }

  // remove an edge from our graph
  removeEdge(vertex1, vertex2) {
    // takes in two vertexes
    // NOTE: this is a very basic implementation. it doesn't have error checking for vertex types and already existing edges. REMEMBER to add those in when interviewing
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      // find the first vertex and set its adjacency list equal to a filtered version of the current list that doesn't include the second vertex
      v => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      // find the second vertex and set its adjacency list equal to a filtered version of the current list that doesn't include the first vertex
      v => v !== vertex1
    );
  }

  // remove a vertex from our graph
  removeVertex(vertex) {
    // take in a vertex
    // NOTE: this is a very basic implementation. it doesn't have error checking for vertex types and already existing edges. REMEMBER to add those in when interviewing
    // GOAL: we want to remove all connections with the provided vertex so we will call removeEdge on each vertex in the provided vertex's array
    while (this.adjacencyList[vertex].length) {
      // loop through the entire array of the provided vertex so long as there are vertexes still in it
      const adjacentVertex = this.adjacencyList[vertex].pop(); // pop off the last vertex of the array and set it equal to a new variable called adjacentVertex
      this.removeEdge(vertex, adjacentVertex); // call removeEdge() between the provided vertex and the vertex we just popped off which is in the adjacentVertex variable
    }

    delete this.adjacencyList[vertex]; // finally, once we have removed every vertex in the vertex's array, we delete the provided vertex from the adjacencyList
  }

  // traverse our graph using DFS (recursive)
  depthFirstRecursive(start) {
    // take in a starting vertex
    const result = []; // initialize an array of all of the vertexes we visit. we will eventually return this array at the end of the method
    const visited = {}; // initialize an object that keeps track of where we have been
    const adjacencyList = this.adjacencyList; // keeps the scope of "this" for adjacencyList so we can use it in our recursive helper function

    // actual recursive helper function
    function dfs(vertex) {
      // take in a vertex
      if (!vertex) return null; // if there isn't a vertex, just return null
      visited[vertex] = true; // take the provided vertex and add it to our visited object and set its value equal to "true" so we know we have visited it
      result.push(vertex); // add the provided vertex to our result array

      adjacencyList[vertex].forEach(neighbor => {
        // go through each vertex in the graph's adjacency list and if that neighbor is not in our visited object that keeps track of the vertexes we have visited,
        // then run the recursive function on that vertex
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    }

    dfs(start); // initialize the recursive dfs function with the provided start variable

    return result; // return the array of vertexes that we traversed
  }

  // traverse our graph using DFS (iterative)
  depthFirstIterative(start) {
    // take in a starting vertex
    const stack = [start]; // create a stack where we will keep track of the vertexes we will go to next. initialize it with the provided start vertex
    const result = []; // keep track of the order of the vertexes we visited. we will eventually return this array at the end of the method
    const visited = {}; // keep track of which vertexes we have visited
    let currentVertex; // initialize a currentVertex variable so we can keep redefining it in the loop below

    visited[start] = true; // add the provided start vertex to the visited object and set its value to "true"

    while (stack.length) {
      // while there are vertexes still in the stack
      currentVertex == stack.pop(); // take the last element off of the stack and define it as the currentVertex
      result.push(currentVertex); // add this current vertex to the result array

      this.adjacencyList[currentVertex].forEach(neighbor => {
        // for each of the neighbors in the current vertex (which is defined in the graph's adjacency list)
        if (!visited[neighbor]) {
          // if we have NOT visited the neighbor
          visited[neighbor] = true; // add that neighbor to the visited object and set its value to "true"
          stack.push(neighbor); // push that neighbor on to the stack so we can check out its neighbors next
        }
      });
    }

    return result; // return the array with all of the vertexes we have visited and the order in which we visited them
  }
}
