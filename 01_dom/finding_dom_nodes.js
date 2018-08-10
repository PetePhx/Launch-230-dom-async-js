// Problems Group 1

// 1. Write a JavaScript function that returns the p elements in the DOM represented by this HTML:

// <!doctype html>
// <html lang="en-US">
//   <head>
//     <title>On the River</title>
//   </head>
//   <body>
//     <h1>On The River</h1>
//     <p>The sun is low</p>
//     <p>The waters flow</p>
//   </body>
// </html>

function walk(node, callback) {
  callback(node);

  var i;
  for (i = 0; i < node.childNodes.length; i++) {
    walk(node.childNodes[i], callback);
  }
}

function findAllParagraphs(doc) {
  var parags = [];
  walk(doc, function (node) {
    if (node.nodeName === 'P') parags.push(node);
  });
  return parags;
}

findAllParagraphs(document); // [p, p]


// 2. Write a JavaScript function that adds the class `article-text` to every <p> tag in this HTML:
//
// <!doctype html>
// <html lang="en-US">
//   <head>
//     <title>On the River</title>
//   </head>
//   <body>
//     <div id="page1">
//       <div class="intro">
//         <p>The sun is low,</p>
//       </div>
//       <p>The waters flow,</p>
//     </div>
//     <div id="page2">
//       <div class="intro">
//         <p>My boat is dancing to and fro.</p>
//       </div>
//       <p>The eve is still,</p>
//     </div>
//     <div id="page3">
//       <div class="intro">
//         <p>Yet from the hill</p>
//       </div>
//       <p>The killdeer echoes loud and shrill.</p>
//     </div>
//   </body>
// </html>

function addClassParagraphs(doc, className) {
  findAllParagraphs(doc).forEach(function (node) {
    node.classList.add(className);
  });
}

addClassParagraphs(document, 'article-text');


// 3. The solution to the previous problem does everything in one function. It works, but if we need to perform a similar operation later, we must write most of the same code again. We can do better by rethinking the problem.
//
// You can think of the problem as having two primary operations: find all the p elements, and then add a class to each of them. We can structure our code similarly; this makes the code's intent clearer to other developers and increases the reusability of the components.
//
// Using this task breakdown, rewrite the solution to the first problem. The core of your solution should be a function named getElementsByTagName that returns an array of all elements with a given tag name. You should then add the CSS class article-text to each paragraph in the array.

function getElementsByTagName(doc, tagName) {
  var nodeArr = [];
  walk(doc, function (node) {
    if (node.nodeName === tagName) nodeArr.push(node);
  });
  return nodeArr;
}

function addClassNodesArray(className, nodesArr) {
  nodesArr.forEach(function (node) {node.classList.add(className)});
}

addClassNodesArray('article-text', getElementsByTagName(document, 'P'));


// Problems Group 2

// 1. Update the code we wrote above to use the document.getElementsByTagName method:

var arr = document.getElementsByTagName('p');
paragArr = Array.prototype.slice.call(arr);
paragArr.forEach(function (node) { node.classList.add('articel-text') });


// 2. Let's make the previous problem more realistic. Instead of adding the article-text class to every paragraph on the page, let's restrict it to only the paragraphs inside a <div class="intro"> tag. How can we do this? Keep in mind that you can call getElementsByClassName and getElementsByTagName on any element; document is handiest when you need all matching elements from the page, but you can use any other element if you don't need everything on the page.

// Update the code from Problem 1 to add the article-text class to paragraphs inside <div class="intro">, and nowhere else.

function intersect(array1, array2) {
  var arr1 = Array.prototype.slice.call(array1); // array-like objects
  var arr2 = Array.prototype.slice.call(array2);

  return arr1.filter(elm => arr2.includes(elm));
}

// intersect([1, 2, 3], [1, 3, 5]); // [1, 3]

var divIntro = intersect(document.getElementsByTagName('div'), document.getElementsByClassName('intro'));

divIntro.forEach(function (div) {
  var parags = Array.prototype.slice.call(div.getElementsByTagName('p'));
  parags.forEach(function (par) { par.classList.add('article-text'); });
});


// using querySelectorAll
var paragraphs = document.querySelectorAll('div.intro p');
for (var i = 0; i < paragraphs.length; i++) {
  paragraphs[i].classList.add('article-text');
}
