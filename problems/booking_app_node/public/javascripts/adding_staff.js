function validateName(name) {
  return /\w+/.test(name);
}

function validateEmail(email) {
  return /\w+@\w+\.\w+/.test(email);
}

document.addEventListener('DOMContentLoaded', function () {
  var formElm = document.querySelector('form');

  formElm.addEventListener('submit', function (event) {
    event.preventDefault();
    var emailVal = document.querySelector('#email').value;
    var nameVal = document.querySelector('#name').value;

    if (!validateName(nameVal)) return(alert('Name is Not Valid!'));
    if (!validateEmail(emailVal)) return(alert('Email is Not Valid!'));

    var data = {
      name: nameVal,
      email: emailVal,
    };
    var dataJSON = JSON.stringify(data);

    var request = new XMLHttpRequest();
    request.open('POST', '/api/staff_members');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(dataJSON);

    request.addEventListener('load', function () {
      if (request.status === 201) alert('Successfully Created. Staff id: ' +
        JSON.parse(request.response).id);
      if (request.status === 400) alert('Error: ' + request.responseText);
    });

    request.addEventListener('error', function () {
      alert('Error: ' + request.responseText);
    });
  });
});
