// Tracing the DOM Tree

// Write a JavaScript function that takes an element's id and returns the DOM tree of the element in a two-dimensional array. The first subarray contains the element and its siblings, the second contains the parent of the element and its siblings, so on and so forth, all the way up to the "grandest" parent. Assume that the grandest parent is the element with an id of "1". Use the following HTML and test cases to test your code:

<!doctype html>
<html>

<head>
  <title>Tracing the DOM Tree</title>
</head>

<body>
  <article id="1">1
    <header id="2">2
      <span id="3">3
        <a href="#" id="4">4</a>
      </span>
    </header>
    <main id="5">5
      <section id="6">6
        <p id="7">7
          <span id="8">8
            <strong id="9">9
              <a href="#" id="10">10</a>
            </strong>
          </span>
        </p>
      </section>
      <section id="11">11
        <p id="12">12
          <span id="13">13
            <strong id="14">14
              <a href="#" id="15">15</a>
            </strong>
          </span>
        </p>
        <p id="16">16
          <span id="17">17
            <strong id="18">18
              <a href="#" id="19">19</a>
            </strong>
          </span>
          <span id="20">20
            <strong id="21">21
              <a href="#" id="22">22</a>
            </strong>
          </span>
        </p>
      </section>
    </main>
    <footer id="23">23
      <p id="24">24</p>
    </footer>
  </article>
</body>

</html>

function domTreeTracer(id) {
  var treeArr = [];
  var siblings;
  curElm = document.getElementById(id);
  while (curElm) {
    siblings = curElm.parentNode.children;
    treeArr.push(arrayize(siblings).map(function (elm) { return elm.nodeName; }));
    if (curElm.id === '1') break;
    curElm = curElm.parentNode;
  }
  return treeArr;
}


function arrayize(pseudoArr) { return Array.prototype.slice.call(pseudoArr); }

domTreeTracer(1); // [["ARTICLE"]]
domTreeTracer(2); // [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
domTreeTracer(22); // [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
domTreeTracer(1000); // []
domTreeTracer('hi'); // []
