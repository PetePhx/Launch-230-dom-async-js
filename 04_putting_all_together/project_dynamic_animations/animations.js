$(function () {
  var $canvas = $('#canvas');
  var $form = $('form');

  function getFormObject($f) {
    var obj = {};
    $f.serializeArray().forEach(function (elm) {
      obj[elm.name] = elm.value;
    });
    return obj;
  }

  function createElement(data) {
    var $div = $('<div></div>', {
      "class": data.shape_type,
      css: {
            left: data.start_x + 'px',
            top: data.start_y + 'px',
          },
      data: data,
    });
    return $div;
  }

  $form.on('submit', function (e) {
    e.preventDefault();
    var data = getFormObject($(this));
    $canvas.append(createElement(data));
  });
});
