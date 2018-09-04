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
      data: data,
    });
    resetElement($div);
    return $div;
  }

  function animateElement() {
    var $e = $(this);
    var data = $e.data();
    resetElement($e);
    $e.animate({
      left: data.end_x + 'px',
      top: data.end_y + 'px',
    }, Number(data.duration));
  }

  function resetElement($e) {
    var data = $e.data();
    $e.css({
      left: data.start_x + 'px',
      top: data.start_y + 'px',
    });
  }

  $form.on('submit', function (e) {
    e.preventDefault();
    var data = getFormObject($(this));
    $canvas.append(createElement(data));
  });

  $('#animate').on('click', function (e) {
    e.preventDefault();
    $canvas.find('div').each(animateElement);
  });

  $('#stop').on('click', function (e) {
    e.preventDefault();
    $canvas.find('div').stop();
  });
});
