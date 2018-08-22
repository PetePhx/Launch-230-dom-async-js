// Reverse Engineer
//
// Study the JavaScript code below and the refactor it such that the same behavior is achieved but without the use of event.stopPropagation:

document.querySelector('html').addEventListener('click', function() {
  document.querySelector('#container').style = 'display: none';
});

document.querySelector('#container').addEventListener('click', function(event) {
  event.stopPropagation();
});

// We can execute the change in style based on a conditional on whether or not it's within the `container` element

var container = document.querySelector('#container');
document.querySelector('html').addEventListener('click', function() {
  if (!container.contains(event.target)) {
  container.style = 'display: none';
  }
});
