function walk(node) {
  console.log(node.nodeName);                     // do something with node
  var i;
  for (i = 0; i < node.childNodes.length; i++) { // for each child node
    walk(node.childNodes[i]);                    // recursively call walk()
  }
}

walk(document.body);                             // log nodeName of every node

// more general approach: provide input function to be invoked on each node

function walk(node, callback) {
  callback(node);                                // do something with node
  var i;
  for (i = 0; i < node.childNodes.length; i++) { // for each child node
    walk(node.childNodes[i], callback);          // recursively call walk()
  }
}

walk(document.body, function(node) {             // log nodeName of every node
  console.log(node.nodeName);
});
