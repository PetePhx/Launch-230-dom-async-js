// Problems

// 1. Write a function named startCounting that logs a number to the console every second, starting with 1. Each number should be one greater than the previous number.

var id;

function startCounting() {
  var i = 0;
  id = setInterval(function () {
    i += 1;
    console.log(i);
  }, 1000);
}

// later
// clearInterval(id);

// 2. Extend the code from the previous problem with a stopCounting function that stops the logger when called.

function stopCounting() {
  clearInterval(id);
}
