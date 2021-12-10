class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size); // set up the hash table was on the size provided to it. REMEMBER: hash tables that are the length of a prime number result in far less collisions
  }

  // hash function
  _hash(key) {
    let total = 0; // this is what we will aggregate as we perform our hashing and will be the variable that is eventually returned
    let WEIRD_PRIME = 31; // random prime number used to reduce collisions

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      // loop through each character in the provided key
      let char = key[i]; // grab the individual character
      let value = char.charCodeAt(0) - 96; // get its UTF code and subtract 96 to get the index in the alphabet

      total = (total * WEIRD_PRIME + value) % this.keyMap.length; // change the total to the current total multiplied by the prime number, then added to the character code value we just found.
      // we use the modulo and the length of the hash table to make sure the index is in bounds of our hash table
    }

    return total;
  }

  // set a key, value pair
  set(key, value) {
    let index = this._hash(key); // run the hash function on the key to get an index of where to place it in the hash table (array)

    if (!this.keyMap[index]) {
      // since we are using separate chaining, first check to see if something already exists at the index we go back from the hash function
      this.keyMap[index] = []; // if nothing does exist, we can start a new array at that spot
    }

    this.keyMap[index].push([key, value]); // then we push the key, value pair from the arguments to the array at that index
  }
}
