var inventory;

(function () {
  inventory = {
    collection: [],
    // ...
    setDate: function () {
      var date = (new Date()).toString();
      $('#order_date').text(date.match(/^\w\w\w \w\w\w \d\d \d\d\d\d/)[0]); // mmm dd yyyy
    },
    cacheTemplate: function () {
      this.template = $('#inventory_item').html();
      $('#inventory_item').remove();
    },
    init: function () {
      this.setDate();
      this.cacheTemplate();
    }
  };

})();

$(inventory.init.bind(inventory));
