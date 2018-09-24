var cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corrolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

var carsFiltered = cars.filter(function () { return true; }); // all cars displayed initially


var carsApp = {
  init: function () {
    this.populateMenus();
    this.populateHtml();
    this.attachListeners();
  },

  populateMenus: function () {
    // get the value for Make
    var make = $('form.specs-form select[name="make"] option:selected').html();
    // get all corresponding models
    var models = this.modelsFromMake(make);
    // reset and add options to the Model menu
    var $modelsMenu =  $('form.specs-form select[name="model"]');
    $modelsMenu.html('<option value="all" selected>All</option>');
    models.forEach(function (elm) {
      $modelsMenu.append(`<option value="${elm}">${elm}</option>`);
    });
  },

  modelsFromMake: function (make) {
    var models = [];
    cars.forEach(function (elm) {
      if (make === 'All' || elm.make === make) {
        if (!models.includes(elm.model)) models.push(elm.model);
      }
    });
    return models;
  },

  populateHtml: function () {
    var listTemplate = Handlebars.compile($('#list-template').html());
    Handlebars.registerPartial('car_li', $('#car-template').html());
    $('main').html(listTemplate({cars: carsFiltered}));
  },

  attachListeners: function () {
    $('form.specs-form').on('submit', this.filterContent.bind(this));
    $('form.specs-form').on('reset', this.resetCars.bind(this));
    $('form.specs-form select[name="make"]').on('change', this.populateMenus.bind(this));
  },

  filterContent: function (e) {
    e.preventDefault();
    console.log($(e.target).serializeArray());
    var specs = this.buildSpecs($(e.target).serializeArray());
    console.log(specs);
    carsFiltered = this.filterBySpecs(specs);
    this.populateHtml();
  },

  buildSpecs: function (serialData) {
    var specs = {};
    serialData.forEach(function (pair) {
      if (!(pair.value === 'all')) specs[pair.name] = pair.value;
    });
    return specs;
  },

  filterBySpecs: function (specs) {
    return cars.filter(function (car) {
      return Object.keys(specs).every(function (key) { return car[key] === specs[key]; });
    });
  },

  resetCars: function () {
    carsFiltered = cars;
    this.populateHtml();
  }
};

$(function () { carsApp.init(); });
