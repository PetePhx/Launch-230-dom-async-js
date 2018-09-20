var animalsApp = {
  init: function () {
    $('ul.listing').on('mouseenter', 'img', this.displayCaption)
                   .on('mouseleave', 'img', this.removeCaption);
  },

  displayCaption: function (e) {
    this.timer = setTimeout(function () {
      $(e.target).next('figcaption').fadeIn();
    }, 500);
  },

  removeCaption: function (e) {
    if (this.timer) clearTimeout(this.timer);
    $(e.target).next('figcaption').fadeOut();
  },

  timer: 0,
};

$(function () {
  animalsApp.init();
});
