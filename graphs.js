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
}
