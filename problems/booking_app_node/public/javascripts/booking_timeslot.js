/*
steps:
- when document.ready:

  (create the options list)
  - retrieve all staff (api)
  - retrieve all available schedules (api)
    - filter for available schedules (student email null)
    - add staff name for each schedule object
    - Create template for registring a new student
    - Create template for schedule options. append to html body // (not needed)
    - populate the "select schedules" options
      - use name, date, time. value is the schedule id

  (Event Handler for submit)
  - Event handler for booking form submit:
    - prevent default
    - new XHR, post, '/api/bookings'
      - send {id: schedule id, email: student email}

    - request handler:
      - if response status 204: alert: booking successful
      - if resposne status 404
        - if resposne contains 'Please check your inputs.'
          - alert 'something went wrong'
        - if resposne contains 'Student does not exists'
          - extract booking sequence
          - alert: student does not exist
          - register student (booking_seq)


- register student function (booking seq)
  - append new student template to html body
  - attache event listener for student register submit:
    - extract: email, name, booking sequence
    - new XHR, post to '/api/students'
    - send {email, name, booking_sequence}
    - XHR event listener:
      - if status 201: alert student added to DB
      - if 403: alert invalid sequence
      - if 400: alert invalid inputs
*/

var staff;
var schedules;

function populateSchedMenu(schedArr) {
  var text = document.getElementById("options-template").innerHTML;
  var optionsTemplate = Handlebars.compile(text);
  var select = document.getElementById("sched-selc");
  select.children[1].remove();      // remove "data loading..."
  select.innerHTML += optionsTemplate({timeslots: schedArr});
}

function registerNewStudent(booking_sequence, student_email) {
  var text = document.getElementById("new-student-template").innerHTML;
  var studentTemplate = Handlebars.compile(text);
  var section = document.createElement('SECTION');
  section.innerHTML = studentTemplate({
    booking_sequence: booking_sequence,
    student_email: student_email,
  });
  document.body.appendChild(section);

  var form = document.getElementById("register-student-frm");
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var request = new XMLHttpRequest();
    request.open(form.method, form.action);
    request.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({
      email: document.getElementById("register-email-inp").value,
      name: document.getElementById("register-name-inp").value,
      booking_sequence: booking_sequence, // Not reading this from the form
    });
    request.send(data);
    request.addEventListener('load', function () { alert(request.response); });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var form1 = document.getElementById("book-schedule-frm");
  // GET staff
  var request1 = new XMLHttpRequest();
  request1.open('GET', '/api/staff_members');
  request1.responseType = 'json';
  request1.send();
  request1.addEventListener('load', function () {
    staff = request1.response;

    // GET schedules
    var request2 = new XMLHttpRequest();
    request2.open('GET', '/api/schedules');
    request2.responseType = 'json';
    request2.send();
    request2.addEventListener('load', function () {
      schedules = request2.response
                          .filter(obj => obj.student_email === null)
                          .map(obj => {
                            return Object.assign(obj,  {
                              staff_name : staff.find(elm => elm.id === obj.staff_id).name,
                            });
                          });
      populateSchedMenu(schedules); // fill the schedules menu
    });
  });

  form1.addEventListener('submit', function (event) {
    event.preventDefault();
    var request = new XMLHttpRequest();
    var id = Number(document.getElementById("sched-selc").value); // MUST be a Number!
    var student_email = document.getElementById("email-inp").value;
    request.open(form1.method, form1.action);
    request.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({
      id: id,
      student_email: student_email,
    });
    request.send(data);

    request.addEventListener('load', function () {
      if (request.status === 204) alert("booking successful");
      if (request.status === 404) {
        if (request.response.includes("Schedule is either booked")) alert(request.response);
        if (request.response.includes("Student does not exist")) {
          alert(request.response);
          var booking_sequence = Number(request.response.match(/\d+$/)[0]);
          registerNewStudent(booking_sequence, student_email);
        }
      }
    });
  });
});
