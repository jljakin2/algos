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
}
