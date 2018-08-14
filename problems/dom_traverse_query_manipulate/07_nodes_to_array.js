// Nodes to Array

// Implement a function that converts the DOM, starting from the body, to nested arrays. Each element in the DOM is represented as ["PARENT_TAG_NAME", [children]] where children are elements as well and as such follow the same format. When an element has no children, it's represented as ["PARENT_TAG_NAME", []]. For instance, if the HTML doesn't have any elements inside the body, the result array would be: ["BODY", []]. Likewise, if the HTML only has a div element as its content, the result array would be: ["BODY", [["DIV", []]]].

// Go over the examples below to better visualize how the DOM is represented as nested arrays.

// example1
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <header id="1"></header>
    <main id="2"></main>
    <footer id="3"></footer>
  </body>
</html>

// example1-output
nodesToArr(); // ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]

// OR

// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

// example2
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <header id="1"></header>
    <main id="2">
      <div></div>
      <div></div>
    </main>
    <footer id="3"></footer>
  </body>
</html>

example2-output
nodesToArr(); // ["BODY",[["HEADER",[]],["MAIN",[["DIV",[]],["DIV",[]]]],["FOOTER",[]]]]

// OR

// = ["BODY", [
//     ["HEADER", []],
//     ["MAIN", [
//       ["DIV", []],
//       ["DIV", []]]],
//     ["FOOTER",[]]]]

// example3
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
    <div id="2"></div>
    <div id="3">
      <div id="7"></div>
      <div id="8"></div>
      <div id="9"></div>
    </div>
  </body>
</html>

// example3-output
nodesToArr();
// ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]]

// OR

// = ["BODY", [
//     ["DIV", [
//       ["DIV", []],
//       ["DIV", [
//         ["DIV",[]]]]]],
//     ["DIV", []],
//     ["DIV", [
//       ["DIV", []],
//       ["DIV", []],
//       ["DIV", []]]]]]


/*
inputs: none
output: nested array of all element tags and children,
rules: for elements wihtout children, have []

algorithem:
  - define a recursive function: nodesArr(node)
    return [ node.tagName,
             arrayize(node.children).map(child -> nodesArr(child))]
  - return nodesArr(`body`)
*/

function nodesArr(node) {
  return [
    node.tagName,
    arrayize(node.children).map(function (child) { return nodesArr(child); })
  ];
}

function nodesToArr() {
  var body = document.querySelector('body');
  return nodesArr(body);
}

function arrayize(psArr) { return Array.prototype.slice.call(psArr); }
