$(function () {
  var templates = {};
  var photos;

  $('script[type="text/x-handlebars"]').each(function () {
    templates[$(this).attr('id')] = Handlebars.compile($(this).html());
  });

  $.ajax({
    url: "/photos",
    success: function (json) {
      photos = json;
      $('#slides').html(templates.photos({photos: photos}));
      $('section > header').html(templates.photo_information(photos[0]));
    },
  });
});
