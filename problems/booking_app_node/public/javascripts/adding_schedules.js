var staff;

(function retrieveStaff () {
  var request = new XMLHttpRequest();
  request.open('GET', '/api/staff_members');
  request.responseType = 'json';
  request.send();
  request.addEventListener('load', function () {
    staff = request.response;
    document.getElementById('add-sched-btn')
            .dispatchEvent(new Event('click')); // display empty form after load
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  var template_text = document.getElementById('form-template').innerHTML;
  var form_template = Handlebars.compile(template_text);

  var form = document.getElementById('schedules-frm');
  var schedNum = 0;                                    // no inputs yet
  var addBtn = document.getElementById('add-sched-btn');
  var submitBtn = document.getElementById('submit-btn');

  addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    schedNum += 1;
    var fieldset = document.createElement('DIV');
    fieldset.innerHTML = form_template({num: schedNum, staff: staff});
    form.insertBefore(fieldset, submitBtn);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var path = form.getAttribute("action");
    for (let i = 1; i <= schedNum; i += 1) { // number of fieldsets
      let staffId = Number(document.getElementById('staff-selc-' + i).value);
      let date = document.getElementById('date-inp-' + i).value;
      let time = document.getElementById('time-inp-' + i).value;
      let data = { schedules: [{ staff_id: staffId, date: date, time: time }] };

      let request = new XMLHttpRequest();
      request.open('POST', path);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(data));
      request.addEventListener('load', function () {
        alert(`Staff id: ${staffId}, Date: ${date}, Time: ${time}.\n` + request.responseText);
      });
    }
  });
});
