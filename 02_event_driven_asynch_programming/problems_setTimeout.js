// Problems

// 1. Write a JavaScript function named delayLog that loops through the numbers from 1 to 10, and logs each number after that number of seconds. It should log 1 after 1 second, 2 after 2 seconds, etc.

// > delayLog();
// 1  // 1 second later
// 2  // 2 seconds later
// 3  // 3 seconds later
// 4  // etc...
// 5
// 6
// 7
// 8
// 9
// 10

// using `let`
function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(function () { console.log(i); }, i * 1000);
  }
}

// using closure/IIFE
function delayLog() {
  var i;
  for (i = 1; i <= 10; i += 1) {
    (function (j) {
      // var j = i;
      setTimeout(function () { console.log(j); }, j * 1000)
    })(i);
  }
}

// using helper function
function makeLogger(number) {
  return function() {
    console.log(number);
  }
}

function delayLog() {
  var i;
  for (i = 1; i <= 10; i += 1) {
    var logger = makeLogger(i);
    setTimeout(logger, i * 1000);
  }
}

delayLog();


// 2. In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.

setTimeout(function() {   // 1
  console.log('Once');    // 5
}, 1000);

setTimeout(function() {   // 2
  console.log('upon');    // 7
}, 3000);

setTimeout(function() {   // 3
  console.log('a');       // 6
}, 2000);

setTimeout(function() {   // 4
  console.log('time');    // 8
}, 4000);


// 3. In what sequence does the JavaScript runtime run the functions q(), d(), n(), z(), s(), f(), and g() in the following code?

setTimeout(function() {
  setTimeout(function() {
    q(); // 7 (~35 ms)
  }, 15);

  d(); // 3 (~10 ms)

  setTimeout(function() {
    n();
  }, 5); // 5 (~15 ms)

  z(); // 4 (~10+ ms)
}, 10);

setTimeout(function() {
  s(); // 6 (~20 ms)
}, 20);

setTimeout(function() {
  f(); // 2 (~0 ms)
});

g(); // 1 (synchronous/immediately)


// 4. Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. The function should wait for the indicated period, then invoke the callback function.

function afterNSeconds(cb, duration) {
  setTimeout(cb, duration * 1000);
}
