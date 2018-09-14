var post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<p><strong>Sed ut perspiciatis</strong> unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>'
};

post.tags = ['lorem', 'ipsum'];

var post2 = {
  title: 'Another Post',
  published: 'April 2, 2015',
  body: '<p>Just <strong>another post</strong> published here.</p>'
};

var posts = [post, post2];

$(function () {
  var postsTemplate = Handlebars.compile($('#posts').html());
  // var tag = Handlebars.registerPartial('tag', '<strong>{{this}}</strong>');
  var tag = Handlebars.registerPartial('tag', $('#tag').html());

  $('body').append(postsTemplate({posts: posts}));
  $('#posts').remove();
});
