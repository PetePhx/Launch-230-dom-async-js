// HTML Imaging

// Read the JavaScript code below. Given the code, create the HTML that matches the DOM rendered by the browser. You don't need to account for the text nodes when creating the HTML. The challenge of this exercise is trying to picture what the HTML will be without running the code. At the very least, try attempting it first with pen and paper. Assume that the following HTML is the starting point:

// Starting HTML
<!doctype html>
<html>
  <head>
    <title>HTML Imaging</title>
  </head>
  <body>
  </body>
</html>

// JavaScript Code
var node1 = document.createElement('header');
var node2 = document.createTextNode('Dynamic Content');

node1.innerHTML = '<p>Hello World!</p>';
document.body.appendChild(node1);
document.body.firstElementChild.insertBefore(node2, node1.firstElementChild);

var node3 = document.createElement('h1');
node3.appendChild(node2);
document.body.firstElementChild.insertBefore(node3, node1.firstElementChild);

node1.setAttribute('id', 'header');
node3.classList.add('emphasis');
node3.classList.add('light');

var node4 = document.createElement('style');
var css1 = ".emphasis { font-weight: bold; }";
var css2 = ".light { color: gray; }";
node4.type = 'text/css';

node4.appendChild(document.createTextNode(css1));
node4.appendChild(document.createTextNode(css2));

document.head.appendChild(node4);


<!doctype html>
<html>
  <head>
    <title>HTML Imaging</title>
    <style type="text/css">// from lines 31-39
      .emphasis { font-weight: bold; }
      .light { color: gray; }
    </style>
  </head>
  <body>
    <header id='header'> // id from line 27
      <h1 class="emphasis light">Dynamic Content</h1> // text from line 21. h1 tag from line 25. classes from line 28-29
      <p>Hello World!</p> // from line 19
    </header>
  </body>
</html>
