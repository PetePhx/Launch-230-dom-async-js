// Array to Nodes

// Implement a function that converts a nested array of nodeNames (see Nodes to Array exercise for examples) into an actual DOM. Go over the sample code and expected output below as a guide for what you will implement.

// Nested array of nodes
var nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

// OR
//
// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

arrayToNodes(nodes);

// example1-output
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>

// example2
// Nested array of nodes
var nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];

// OR
//
// ["BODY", [
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", [
//       ["DIV",[]]]]]],
//   ["DIV", []],
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", []],
//     ["DIV", []]]]]]

arrayToNodes(nodes);

// example2-output
<body>
  <div>
    <div></div>
    <div>
      <div></div>
    </div>
  </div>
  <div></div>
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</body>

/*
input: nested array of nodes [tagName, [child1, child2, ..., childN]]
output: html elements with the correct nesting structure

algorithm:
  - recursive function array2Node:
    input: [tagName, [child1, ..., childN]]
    - set parent to <body>
    - create a child with tag tagName, assign to parent
    - run array2Node for each of the children, with parent set to <tag>

  - run array2Node on document
*/

function array2Nodes(parent, arr) {
  var elm = document.createElement(arr[0]);
  parent.appendChild(elm);
  arr[1].forEach(function (subArr) {
    array2Nodes(elm, subArr);
  });
}

function arrayToNodes(arr) {                 // spacial case for <body>
  var body = document.querySelector('body');
  arr[1].forEach(function (subArr) { array2Nodes(body, subArr); });
}
