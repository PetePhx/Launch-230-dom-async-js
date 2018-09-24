var internalTime = 0; // in centi-seconds

var padZeros = function (num) {
  return (num < 10 ? '0' + String(num) : String(num));
}

var stopwatchApp = {
  init: function () {
    // attach listeners to buttons
    this.initializeElms();
    this.attachListeners();
  },

  attachListeners: function () {
    this.$startStop.on('click', this.startStop.bind(this));
    this.$reset.on('click', this.resetAll.bind(this));
  },

  resetAll: function () {
    clearInterval(this.intervalId);
    internalTime = 0;
    this.running = false;
    this.$centisecs.html('00');
    this.$seconds.html('00');
    this.$minutes.html('00');
    this.$hours.html('00');
  },

  startStop: function () {
    this.running = !(this.running);
    this.$startStop.html(this.running ? 'stop' : 'start'); //change labels
    if (this.running) {
      this.intervalId = setInterval(function () {
        internalTime += 1; // add one centi-second...
        this.updateTimer();
      }.bind(this), 10);              // every 10 miliseconds
    } else {
      clearInterval(this.intervalId);
    }
  },

  updateTimer: function () {
    this.$centisecs.html(padZeros(internalTime % 100));
    this.$seconds.html(padZeros(Math.floor((internalTime / 100)) % 60));
    this.$minutes.html(padZeros(Math.floor(internalTime / 60 / 100) % 60));
    this.$hours.html(padZeros(Math.floor(internalTime / 3600 / 100)));
  },

  initializeElms: function () {
    this.$hours = $('#hours');
    this.$minutes = $('#minutes');
    this.$seconds = $('#seconds');
    this.$centisecs = $('#centisecs');
    this.$startStop = $('#startstop');
    this.$reset = $('#reset');
  },

  $hours: null,
  $minutes: null,
  $seconds: null,
  $centisecs: null,
  $startStop: null,
  $reset: null,

  running: false,

  intervalId: null,
};

$(function () {
  stopwatchApp.init();
});
