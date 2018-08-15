// Work Back

// Given the JavaScript code below, create the corresponding HTML that results to the same logs to the console when executed in sequence.

console.log(document.head.childNodes.length);
= 3
console.log(document.head.children[0].tagName);
= 'TITLE'
console.log(document.head.textContent);
// = "
//       Title
//     "
console.log(document.body.children.length);
= 3
console.log(document.body.childNodes.length);
= 5
console.log(document.querySelector('div').parentNode.parentNode.tagName);
= 'BODY'
console.log(document.querySelector('div section').children[2].nextElementSibling);
= null
console.log(document.querySelectorAll('div').length);
= 1

var nodeA = document.body.firstElementChild;
console.log(document.querySelector('footer').children.length);
= 1
console.log(document.querySelector('body').replaceChild(
  document.querySelector('footer'), document.body.firstElementChild).tagName);
= 'HEADER'
console.log(document.body.appendChild(nodeA));
= Header node

console.log(document.querySelector('section').textContent.split("\n").map(function(text) {
  return text.trim();
}).filter(function(text) {
  return text.length > 0;
}));
= ["H1", "Hello", "World"]

console.log(document.querySelector('section').children);
= HTMLCollection(3) [h1, p, p]
console.log(document.querySelector('section').textContent);
// = "
//             H1
//             Hello
//             World
//           "

console.log(document.querySelector('span.emphasis').parentNode.tagName);
= 'FOOTER'


<!doctype html>
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
    <header></header><main>
      <div>
        <section>
          <h1>H1</h1>
          <p>Hello</p>
          <p>World</p>
        </section>
      </div>
    </main><footer><span class="emphasis"></span></footer>
  </body>
</html>
