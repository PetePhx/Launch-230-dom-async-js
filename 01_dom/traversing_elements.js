// Practice Problems: Finding Nodes and Traversing Elements

// For the following practice problems, please use the HTML* of this Wikipedia page.

// *The HTML was extracted to get a consistent outcome even if the actual article changes (date extracted: 3/31/18)

// 1. Write some JavaScript code to retrieve a word count for each h2 heading on the page.

function arrayize(pseudoArr) { return Array.prototype.slice.call(pseudoArr); }

var h2 = arrayize(document.querySelectorAll('h2'));

var counts = h2.map(function (node) {
  return node.textContent.split(/\s+/).length;
});

counts; // [1, 3, 3, 3, 1, 2, 4, 1, 5, 2, 2, 1, 1, 2, 2, 2]


// 2. The page has a table of contents with the title "Contents" and links to the different content sections on "Naming and etymology," "Taxonomy and evolution," etc.

// Use three different DOM methods to retrieve a reference to the div element that contains the table of contents.

// method 1: getElementById()
var tocDiv = document.getElementById('toc');
console.log(tocDiv.textContent.trim().slice(0, 8)); // Contents

// method 2:  getElementsByClassName()
var tocDiv = document.getElementsByClassName('toc')[0];
console.log(tocDiv.textContent.trim().slice(0, 8)); // Contents

// method 3: querySelector
var tocDiv = document.querySelector('#toc');
console.log(tocDiv.textContent.trim().slice(0, 8)); // Contents


// 3. Write some JavaScript code to change the color for every other link in the table of contents to green.

var links = arrayize(tocDiv.querySelectorAll('a'));
links.forEach(function (elm, idx) {
  if (idx % 2 === 0) elm.style.color = 'green';
});

// alternatively
var links = arrayize(document.querySelectorAll('#toc a'));


// 4. Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

var thumbs = arrayize(document.querySelectorAll('.thumbcaption'));

thumbs.map(function (node) { return node.textContent.trim(); });

/* ["Polar bears have evolved adaptations for Arctic li…arp, stocky claws give them good traction on ice.", "Polar bears investigate the submarine USS Honolulu 450 kilometres (280 mi) from the North Pole", "Polar bears play-fighting", "Polar bear jumping on fast ice", "Skull, as illustrated by N. N. Kondakov", "Polar bear skeleton", "Captive polar bear swimming", "Subadult polar bear males frequently play-fight. D…s intense and often leaves scars or broken teeth.", "Long muzzle and neck of the polar bear help it to …l hindquarters enable it to drag massive prey[85]", "Polar bear feeding on a bearded seal", "Some characteristic postures:↵                ↵   …ing a situation;↵                    when feeding", "Cubs are born helpless and typically nurse for two and a half years", "Mother and cub on Svalbard", "Cub nursing", "Skins of hunted polar bears", "Road sign warning about the presence of polar bears", "Dogsleds are used for recreational hunting of polar bears in Canada.", "Map from the U.S. Geological Survey shows projecte…mal polar bear habitat; blue areas indicate gain.", "Mothers and cubs have high nutritional requirement…e not met if the seal-hunting season is too short", "Polar bear on Svalbard, starving due to the ice around the islands melting earlier than before", "Swimming", "Engraving, made by Chukchi carvers in the 1940s on a walrus tusk, depicts polar bears hunting walrus", "Greenland's 1911 five kroner note depicting a polar bear", "Coat of arms of the Chukotka Autonomous Okrug in the Russian Federation", "Coat of arms of the Greenlandic Self-Rule government (Kalaallit Nunaat)"] */


// 5. You can think of the scientific classification of an animal as a series of key-value pairs. Here, the keys are taxonomic ranks (Domain, Kingdom, Phylum, etc.). The values are the specific groups to which the animal belongs.

// Write JavaScript code that extracts this information from the web page and logs an Object that uses the ranks as keys and the groups as values.


var obj = {};
var keys = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];

var table = document.querySelector('table.infobox.biota');

var tdArr = arrayize(table.querySelectorAll('td'));

keys.forEach(function (key) {
  var node1 = tdArr.filter(function (node) {
    return RegExp(key).test(node.textContent);
  })[0];

  obj[key] = node1.nextElementSibling.textContent;
});

obj; // {Kingdom: "Animalia", Phylum: "Chordata", Class: "Mammalia", Order: "Carnivora", Family: "Ursidae", …}
