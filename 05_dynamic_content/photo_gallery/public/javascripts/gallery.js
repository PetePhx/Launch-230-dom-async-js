$(function () {
  var templates = {};
  var photos;
  var photo_id;

  $('script[type="text/x-handlebars"]').each(function () {
    templates[$(this).attr('id')] = Handlebars.compile($(this).html());
  });

  $('[data-type=partial]').each(function () {
    Handlebars.registerPartial($(this).attr("id"), $(this).html());

  });

  $.ajax({
    url: "/photos",
    success: function (json) {
      photos = json;
      renderPhotos();
      renderPhotoInformation(0);
      getCommentsFor(photos[0].id);
      // photo_id = $('section a').attr('data-id');
    },
  });

  function renderPhotos() {
    $('#slides').html(templates.photos({photos: photos}));
  }

  function renderPhotoInformation(idx) {
    $('section > header').html(templates.photo_information(photos[idx]));
  }

  function getCommentsFor(idx) {
    $.ajax({
      url: '/comments',
      data: 'photo_id=' + idx,
      success: function (comment_json) {
        console.dir(comment_json);
        $('#comments ul').html(templates.comments({comments: comment_json}));
      },
    });
  }
});
