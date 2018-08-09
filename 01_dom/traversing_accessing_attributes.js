//
// Practice Problems: Traversing and Accessing Attributes
//
// Use the following HTML to solve these practice problems:
//
// <!doctype html>
// <html lang="en-US">
//   <head>
//     <title>On the River</title>
//   </head>
//   <body>
//     <h1>On the River</h1>
//     <p>A poem by Paul Laurence Dunbar</p>
//
//     <p>
//       The sun is low,<br>
//       The waters flow,<br>
//       My boat is dancing to and fro.<br>
//       The eve is still,<br>
//       Yet from the hill<br>
//       The killdeer echoes loud and shrill.
//     </p>
//     <p>
//       The paddles plash,<br>
//       The wavelets dash,<br>
//       We see the summer lightning flash;<br>
//       While now and then,<br>
//       In marsh and fen<br>
//       Too muddy for the feet of men,
//     </p>
//     <p>
//       Where neither bird<br>
//       Nor beast has stirred,<br>
//       The spotted bullfrog's croak is heard.<br>
//       The wind is high,<br>
//       The grasses sigh,<br>
//       The sluggish stream goes sobbing by.
//     </p>
//     <p>
//       And far away<br>
//       The dying day<br>
//       Has cast its last effulgent ray;<br>
//       While on the land<br>
//       The shadows stand<br>
//       Proclaiming that the eve's at hand.
//     </p>
//   </body>
// </html>
//
// You may use the walk function we looked at earlier:
//
function walk(node, callback) {
  callback(node);

  var i;
  for (i = 0; i < node.childNodes.length; i++) {
    walk(node.childNodes[i], callback);
  }
}
//
// You may also use any DOM traversal methods we've discussed so far except querySelector and querySelectorAll.


// 1. Starting with the `document` node, use the `lastChild` and `childNodes` properties to change the text color to red on the On the River heading and set its font size 48 pixels.

// within the browser console:
var h1 = document.lastChild.lastChild.childNodes[1]; // document > html > body > h1
h1.style.color = 'red';
h1.style.fontSize = '48px';


// 2. Count and log the paragraphs on the page.
var parCount = 0;

walk(document, function (node) {
  if (node.nodeName === 'P') {
    parCount += 1;
    console.log(node.textContent);
  }
});

console.log(parCount);


// 3. Retrieve the first word from each paragraph on the page and log the entire list.

var firstWords = [];

walk(document, function (node) {
  if (node.nodeName === 'P' && /\S+/.test(node.textContent)) { // non-empty paragraphs
    firstWords.push(node.textContent.match(/\S+/)[0]);
  }
});

console.log(firstWords);
// ["A", "The", "The", "Where", "And"]

// Alternatively: use `data`
var firstWords = [];
walk(document, function(node) {
  if (node.nodeName === 'P') {
    var text = node.firstChild.data.trim();
    if (text.length > 0) firstWords.push(text.split(' ')[0]);
  }
});


// 4. Add the class `stanza` to each paragraph except the first.

var firstPar = true;
walk(document, function(node) {
  if (node.nodeName === 'P') {
    firstPar ? (firstPar = !firstPar) : node.classList.add('stanza');
  }
});
