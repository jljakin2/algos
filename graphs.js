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
}
