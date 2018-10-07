function cancelSchedule(scheduleId) {
  createSubmitXHR({
    method: 'DELETE',
    url: `/api/schedules/${scheduleId}`,
    contentType: 'json',
    payload: JSON.stringify({schedule_id: Number(scheduleId)}),
    loadcb: function () {
      if (this.status === 204) {
        alert('Schedule Deleted Successfully!');
      } else {
        alert(this.response);
      }
    },
  });
}

function cancelBooking(bookingId) {
  createSubmitXHR({
    method: 'PUT',
    url: `/api/bookings/${bookingId}`,
    contentType: 'json',
    payload: JSON.stringify({booking_id: Number(bookingId)}),
    loadcb: function () {
      if (this.status === 204) {
        alert('Booking Deleted Successfully!');
      } else {
        alert(this.response);
      }
    },
  });
}

function createSubmitXHR(conf) {
  var req = new XMLHttpRequest();
  req.open(conf.method, conf.url);
  req.setRequestHeader('Content-Type', conf.contentType);
  req.send(conf.payload);
  req.addEventListener('load', conf.loadcb.bind(req));
}
