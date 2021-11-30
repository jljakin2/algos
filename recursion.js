// function power(base, exp) {
//   if (exp === 0) return 1;
//   return base * power(base, exp - 1);
// }

// console.log(power(5, 2));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function factorial(num) {
//   if (num < 0) return 0;
//   if (num === 1) return 1;
//   return num * factorial(num - 1);
// }

// console.log(factorial(4));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function productOfArray(arr) {
//   if (arr.length === 0) return 0;
//   if (arr.length === 1) return arr[0];
//   return arr[0] * productOfArray(arr.slice(1));
// }

// console.log(productOfArray([1, 2, 3, 10]));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function recursiveRange(num) {
//   if (num <= 0) return 0;
//   return num + recursiveRange(num - 1);
// }

// console.log(recursiveRange(6));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function fib(num) {
//     /**
//      * Find the location of the given word in the fibonacci sequence
//      */
//   if (num <= 2) return 1;
//   return fib(num - 1) + fib(num - 2);
// }

// console.log(fib(4));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function reverse(word) {
//   /**
//    * Take the given word and reverse it. Return the new word
//    */
//   const newArr = [];

//   function helper(input) {
//     if (input.length === 0) return;

//     newArr.push(input[input.length - 1]);

//     helper(input.substring(0, input.length - 1));
//   }

//   helper(word);

//   return newArr.join("");
// }

// console.log(reverse("awesome"));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function isPalindrome(word) {
//   /**
//    * Check if word is palindrome. will return boolean
//    */
//   const newArr = [];

//   function helper(input) {
//     if (input.length === 0) return;

//     newArr.push(input[input.length - 1]);

//     helper(input.substring(0, input.length - 1));
//   }

//   helper(word);

//   return newArr.join("") === word;
// }

// console.log(isPalindrome("foobar"));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const isOdd = val => val % 2 !== 0;

// function someRecursive(arr, callback) {
//   const newArr = [];

//   function helper(helperInput) {
//     if (helperInput.length === 0) return helperInput;

//     if (callback(helperInput[0])) {
//       newArr.push(helperInput[0]);
//     }

//     helper(helperInput.slice(1));
//   }

//   helper(arr);

//   return newArr.length > 0 ? true : false;
// }

// console.log(someRecursive([1, 2, 3, 4], isOdd)); // true
// console.log(someRecursive([4, 6, 8, 9], isOdd)); // true
// console.log(someRecursive([4, 6, 8], isOdd)); // false

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function flatten(arr) {
//   const finalArr = [];

//   function helper(newInput) {
//     if (newInput.length === 0) return newInput;
//     if (typeof newInput[0] !== "number") {
//       helper(newInput[0]);
//     } else {
//       finalArr.push(newInput[0]);
//     }

//     helper(newInput.slice(1));
//   }

//   helper(arr);

//   return finalArr;
// }

// console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
// console.log(flatten([[1], [2], [3]])); // [1,2,3]
// console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3]

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function capitalizeFirst(arr) {
//   const finalArr = [];

//   function helper(newInput) {
//     if (newInput.length === 0) return newInput;

//     const newArr = newInput[0].split("");

//     const firstLetter = newArr[0];
//     const capitalLetter = firstLetter.toUpperCase();

//     const arrWithCapital = [capitalLetter, ...newArr.slice(1)];

//     const newWord = arrWithCapital.join("");

//     finalArr.push(newWord);

//     helper(newInput.slice(1));
//   }

//   helper(arr);

//   return finalArr;
// }

// console.log(capitalizeFirst(["car", "taco", "banana"])); // ['Car','Taco','Banana']

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function nestedEvenSum(obj) {
  let values = Object.values(obj);
  let sum = 0;

  function helper(newInput) {
    if (newInput.length === 1) return;
    if (typeof newInput[0] !== "number") {
      helper(newInput[0]);
    } else {
      sum += newInput[0];
    }

    helper(newInput.slice(1));
  }

  helper(values);

  return sum;

  //   return typeof values;
}

var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};

var obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" },
};

console.log(nestedEvenSum(obj1)); // 6
// console.log(nestedEvenSum(obj2)); // 10
