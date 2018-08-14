// Coloring

// Write a function that colors a specific generation of the DOM tree. A generation is a set of elements that are on the same level of indentation. We'll be using a "styled" version of the following HTML for this exercise to better visualize the generations. You may use the .generation-color class to color the specific generation. You can assume that only non-negative integers will be provided as arguments. Following are some sample output to help you test your code:

<!doctype html>
<html>

<head>
  <title>Coloring</title>
  <link href="style.css" rel="stylesheet">
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

function arrayize(pseudoArr) { return Array.prototype.slice.call(pseudoArr); }

function generationColor(gen, color) {
  getGeneration(gen).forEach(function (elm) { elm.style.backgroundColor = color; });
}

function getGeneration(gen) {
  var arr = [document.querySelector('body').firstElementChild];
  if (gen <= 0) return [];

  for (var i = 2; i <= gen; i += 1) {
    arr = arr.map(function (elm) { return arrayize(elm.children); })   // map to children
             .reduce(function (acc, elm) { return acc.concat(elm);},   // flatten
             []);
  }

  return arr;
}


getGeneration(1); // [article#1]
getGeneration(2); // [header#2, main#5, footer#23]
getGeneration(3); // [span#3, section#6, section#11, p#24]
getGeneration(4); // [a#4, p#7, p#12, p#16]

generationColor(2, 'cyan');
generationColor(3, 'teal');
generationColor(4, 'navy');
generationColor(5, 'sienna');
