// Counting Nodes

// Go over the two HTML snippets. How many nodes will the resulting DOM tree have?

<div>
  <p>Then press the <em>Draw</em> button</p>
</div>

// 8 nodes + 3 nodes (html, head, body) = 11:
//                  div
//
// empty text,  p element,  empty text
//
//      text,  em element,  text
//
//                text

<div><p>Then press the <em>Draw</em> button.</p></div>

// 5 nodes + 3 nodes (html, head, body) = 8:
//                  div
//
//              p element
//
//      text,  em element,  text
//
//                text
