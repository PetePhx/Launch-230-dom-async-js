/*

steps:
- Not using any Html templating
- within document DOMContentLoaded:
  - first, retrieve all dates with booked schedules:
    - GET /api/bookings
  - for each date, add a <li> in the dates <ul>
    - include id="mm-dd-yy"
    - include a nested <ul class="details-ul"> for bookings

  - attach an elevent listener to <ul id="dates-ul">. on click:
    - get the event.target id (date string)
    - GET /api/bookings/`date`
    - loop through the resposne array:
      - forEach element:
        - create a child element <li>
          - text content: element.join(' | ')
        - append child to <ul> descendant of event target

  Structure:

  <ul id="dates-ul">
    <li class="date-li" id="aa-bb-cc">
      aa-bb-cc
      <ul class="details-ul">
        <li>"Vincent Ortiz | garth@king.org | 06:00"</li>
        <li>"Vincent Ortiz | garth@king.org | 07:00"</li>
      </ul>
    </li>
  </ul>
*/

document.addEventListener('DOMContentLoaded', function () {
  getDates();
  var ulDates = document.getElementById('dates-ul');
  ulDates.addEventListener('click', datesUlClick); // event listener for dates-ul
});

function datesUlClick(event) {
  // listen only to upper level li's not expanded already
  if (!event.target.classList.contains('date-li') ||
      event.target.classList.contains('expanded')) return;

  var dateStr = event.target.id;

  // Get the bookings for a given date
  var req = new XMLHttpRequest();
  req.open('GET', `/api/bookings/${dateStr}`);
  req.responseType = 'json';
  req.send();
  req.addEventListener('load', function () {
    var resp = req.response;
    resp.forEach(function (bookingArr) {
      let li = document.createElement('LI');
      li.textContent = bookingArr.join(' | ');
      event.target
           .children[0]
           .appendChild(li);
    });
  });
  event.target.classList.add('expanded');
}

function getDates() { // Get the dates + display them
  var ulDates = document.getElementById('dates-ul');
  var req = new XMLHttpRequest();
  req.open('GET', '/api/bookings');
  req.responseType = 'json';
  req.send();
  req.addEventListener('load', function () {
    var resp = req.response;
    resp.forEach(function (dateStr) {
      let li = document.createElement('LI');
      li.id = dateStr;
      li.classList.add('date-li');
      li.innerHTML = dateStr + '<ul class="details-ul"></ul>';
      ulDates.appendChild(li);
    });
  });
}
