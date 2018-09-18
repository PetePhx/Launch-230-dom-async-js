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

  var slideshow = {
    init: function () {
      this.bind();
    },
    bind: function () {
      this.$el.find('a.prev').on('click', this.prevSlide.bind(this));
      this.$el.find('a.next').on('click', this.nextSlide.bind(this));
    },
    $el: $('#slideshow'),
    prevSlide: function (e) {
      e.preventDefault();
      var $current = this.$el.find("figure:visible");
      var $prev = $current.prev("figure");

      if ($prev.length === 0) $prev = this.$el.find("figure").last();
      $current.fadeOut(this.fadeDur);
      $prev.fadeIn(this.fadeDur);
      this.renderPhotoContent($prev.attr("data-id"));
    },
    nextSlide: function (e) {
      e.preventDefault();
      var $current = this.$el.find("figure:visible");
      var $next = $current.next("figure");

      if ($next.length === 0) $next = this.$el.find("figure").first();
      $current.fadeOut(this.fadeDur);
      $next.fadeIn(this.fadeDur);
      this.renderPhotoContent($next.attr("data-id"));
    },
    fadeDur: 500, //miliseconds
    renderPhotoContent: function (idx) {
      renderPhotoInformation(idx);
      getCommentsFor(idx);
    },
  };

  $.ajax({
    url: "/photos",
    success: function (json) {
      photos = json;
      renderPhotos();
      renderPhotoInformation(1);
      slideshow.init();
      getCommentsFor(photos[0].id);
    },
  });

  function renderPhotos() {
    $('#slides').html(templates.photos({photos: photos}));
  }

  function renderPhotoInformation(idx) {
    var photo = photos.find(function (elm) { return elm.id === Number(idx); });
    $('section > header').html(templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    $.ajax({
      url: '/comments',
      data: 'photo_id=' + idx,
      success: function (comment_json) {
        $('#comments ul').html(templates.comments({comments: comment_json}));
      },
    });
  }
});
