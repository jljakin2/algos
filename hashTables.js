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

  // get a value, based on the provided key
  get(key) {
    let index = this._hash(key); // run the hash function on the provided key to get an index of where to place it in the hash table (array)

    if (this.keyMap[index]) {
      // if there is something at the index
      for (let i = 0; i < this.keyMap[index].length; i++) {
        // loop through all of the items at that index (if there are multiple. otherwise, the loop will only run once)
        if (this.keyMap[index][i][0] === key) {
          // if the key at that index and iteration of the items at that index ([i] is the index of the loop and [0] grabs the key in the key, value array) are equal to the provided key
          return this.keyMap[index][i][1]; // return the value of that matching key, value pair
        }
      }
    }

    return undefined; // if nothing is ever found, return undefined
  }

  // get all of the values in the hash table
  values() {
    let valuesArr = []; // set an empty array which we will eventually push all of the values to and return it at the end

    for (let i = 0; i < this.keyMap.length; i++) {
      // loop through the entire hash table
      if (this.keyMap[i]) {
        // if an item exists at that index. this avoids looping through indexes of the hash table that have nothing in them
        for (let j = 0; j < this.keyMap[i].length; j++) {
          // within that index, loop over all key, value pairs (it's possible there is only one pair but the loop gives flexibility for multiple)
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            // if the final valuesArr doesn't have the value we are evaluating in it. REMEMBER: values are the second item in the key, value pair which is why we use [1]
            valuesArr.push(this.keyMap[i][j][1]); // push that value into the final valuesArr array
          }
        }
      }
    }
    return valuesArr; // return valuesArr array with whatever values we found
  }

  // get all of the keys in the hash table.
  // this implementation doesn't deal with duplicate keys.
  // you could either create a check for it in the set method and notify the user or replace the existing key, value pair which is what most programming languages do.
  keys() {
    let keysArr = []; // set an empty array which we will eventually push all of the keys to and return it at the end

    for (let i = 0; i < this.keyMap.length; i++) {
      // loop through the entire hash table
      if (this.keyMap[i]) {
        // if an item exists at that index. this avoids looping through indexes of the hash table that have nothing in them
        for (let j = 0; j < this.keyMap[i].length; j++) {
          // within that index, loop over all key, value pairs (it's possible there is only one pair but the loop gives flexibility for multiple)
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            // if the final valuesArr doesn't have the key we are evaluating in it. REMEMBER: keys are the first item in the key, value pair which is why we use [0]
            keysArr.push(this.keyMap[i][j][0]); // push that key into the final valuesArr array
          }
        }
      }
    }
    return keysArr;
  }
}
