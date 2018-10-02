function tallySchedules(list) {
  var out = {};

  list.forEach(function (elm) {
    var staff_id = String(elm.staff_id);
    out[staff_id] ? out[staff_id] += 1 : out[staff_id] = 1;
  });

  return out;
}

document.addEventListener('DOMContentLoaded', function () {
  var schedSec = document.getElementById('schedules'); // html section
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000; // 5 sec
  request.responseType = 'json';
  var schedList;

  request.addEventListener('load', function () {
    var response = request.response;
    schedList = tallySchedules(response);
    if (Object.keys(schedList).length > 0) {
      Object.keys(schedList).forEach(function (key) {
        var par = document.createElement('p');
        par.textContent = "Staff " + key + ": " + schedList[key];
        schedSec.appendChild(par);
      });
    } else {
      var par = document.createElement('p');
      par.textContent = 'Nothing Scheduled!';
      schedSec.appendChild(par);
    }
  });

  request.addEventListener('timeout', function () {
    var par = document.createElement('p');
    par.textContent = 'The request timed out...! Try again later.';
    document.body.appendChild(par);
  });

  request.addEventListener('loadend', function () {
    var par = document.createElement('p');
    par.textContent = 'Finished Processing of the request.';
    document.body.appendChild(par);
  });

  request.send();
});
