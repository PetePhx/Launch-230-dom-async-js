// Node Swap

// Write a function that takes two element ids as arguments and swaps the positions of the elements represented by the ids. The function returns true for valid swaps and undefined for invalid. To put the focus on the node swapping functionality, you can assume that nodes will have a value for the id attribute and two arguments will always be provided. Use the following HTML and sample codes to test your output:

<!doctype html>
<html>
  <head>
    <title>Node Swap</title>
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

// Invalid Swaps

// at least one of the id attributes doesn't exist
nodeSwap(1, 20); // undefined

// at least one of the nodes is a "child" of the other
nodeSwap(1, 4); // undefined
nodeSwap(9, 3); // undefined

// Valid Swaps

// one swap
nodeSwap(1, 2);

<!doctype html>
<html>
  <head>
    <title>Node Swap</title>
  </head>
  <body>
    <div id="2"></div>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
    <div id="3">
      <div id="7"></div>
      <div id="8"></div>
      <div id="9"></div>
    </div>
  </body>
</html>

// multiple swaps
nodeSwap(3, 1);
nodeSwap(7, 9);

<!doctype html>
<html>
  <head>
    <title>Node Swap</title>
  </head>
  <body>
    <div id="3">
      <div id="9"></div>
      <div id="8"></div>
      <div id="7"></div>
    </div>
    <div id="2"></div>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
  </body>
</html>

/*
inputs: id's for nodes to be swapped
output: updated html with swapped nodes
rules: return undefined if invalid nodes or one node a parent of another

algorithm:
  - getElementById for id1 and id2 (elm1, elm2)
    - if either is invalid, return undefined
  - build children (descendant) arrays for elm1 and elm2
    - walk the element, keep adding child elements to array, return the array
  - if elm1 in children2 or elm2 in children1, return undefined
  - swap the two elements:
    - create a temprary element (tempElm) before elm1
    - insert elm1 before elm2
    - inser elm2 before tempElm
    - remove tempElm

*/

function arrayize(psArr) { return Array.prototype.slice.call(psArr); }

function walk(elm, cb) {
  cb(elm);
  arrayize(elm.children).forEach(function (childElm) { walk(childElm, cb); });
}

function descendants(elm) {
  var arr = [];
  walk(elm, function (e) { arr.push(e); });
  return arr.slice(1); // removing the elm itself
}

var elm = document.getElementById('1');
descendants(elm); // [div#4, div#5, div#6]

function elmSwap(id1, id2) {
  var elm1 = document.getElementById(id1);
  var elm2 = document.getElementById(id2);
  if (!elm1 || !elm2) return undefined;

  var descend1 = descendants(elm1);
  var descend2 = descendants(elm2);
  if (descend1.includes(elm2) || descend2.includes(elm1)) return undefined;

  var tempElm = document.createElement('div');
  elm1.insertAdjacentElement('beforebegin', tempElm);
  elm2.insertAdjacentElement('beforebegin', elm1);
  tempElm.insertAdjacentElement('beforebegin', elm2);
  tempElm.remove();
}

// Note: instead of descendants, we could use the method `contains` to check whether a node contains another one.

function elmSwap(id1, id2) {
  var elm1 = document.getElementById(id1);
  var elm2 = document.getElementById(id2);
  if (!elm1 || !elm2) return undefined;
  if (elm1.contains(elm2) || elm2.contains(elm1)) return undefined;

  var tempElm = document.createElement('div');
  elm1.insertAdjacentElement('beforebegin', tempElm);
  elm2.insertAdjacentElement('beforebegin', elm1);
  tempElm.insertAdjacentElement('beforebegin', elm2);
  tempElm.remove();
}

// Note: we could also use targetNode.parentNode.insertBefore(node, targetNode)
