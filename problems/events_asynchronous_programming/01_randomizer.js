/*

Randomizer

Write a function, randomizer that accepts n number of callbacks that will be executed at a random point in time. In addition to executing the callbacks, randomizer should also log the elapsed time in seconds. To limit the randomness of the points in time that callbacks will be executed, you may assume that all callbacks should be executed within 2 * number of callbacks seconds.

*/

/*

- input: a number of callbacks (n)
- output: execution of callbacks in random order with uniform distrbution between time 0 and time 2 * n

- rules: after each second passing, log time.

- Algorithm
  - determine n based on the number of inputs
    - arguments.length
  - set timeouts for logging each second passed, 1 to 2n.
  - choose n random numbers between 0 and 2000 * n (millisoconds): array of randNums
  - set timeouts for calls back execution:
    - i'th callback executed at randNums[i] time.
*/

function randomizer(...cbArr) {
  var n = cbArr.length;
  var randNums = Array(n).fill().map(function () { // generate random times
    return Math.floor((2000 * n + 1) * Math.random());
  });

  for (let i = 1; i <= 2 * n; i += 1) { // log seconds
    setTimeout(function () { console.log(i); }, i * 1000);
  }

  cbArr.forEach(function (cb, idx) { setTimeout(cb, randNums[idx]); }); // execute cb's
}


// console.log(randNums);
function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);

// 1
// 2
// callback3
// 3
// 4
// callback2
// 5
// callback1
// 6
