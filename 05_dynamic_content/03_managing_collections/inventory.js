var inventory;

(function () {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function () {
      var date = (new Date()).toString();
      $('#order_date').text(date.match(/^\w\w\w \w\w\w \d\d \d\d\d\d/)[0]); // mmm dd yyyy
    },
    cacheTemplate: function () {
      this.template = $('#inventory_item').html();
      $('#inventory_item').remove();
    },
    addItem: function (e) {
      e.preventDefault();
      this.lastId += 1;
      $('#inventory').append(this.template.replace(/ID/g, this.lastId));
      this.collection.push({
        id: this.lastId,
        name: '',
        stockNumber: '',
        quantity: 1,
      });
    },
    updateItem: function (e) {
      var id = Number($(e.target).attr('name').slice(-1));
      var item = this.collection.find(function (elm) {
        return elm.id === id;
      });
      item.name = $('input[name="item_name_' + id + '"]').val();
      item.stockNumber = $('input[name="item_stock_number_' + id + '"]').val();
      item.quantity = Number($('input[name="item_quantity_' + id + '"]').val());
    },
    deleteItem: function (e) {
      e.preventDefault();
      var id = Number($(e.target).closest('tr')
                                 .find('td input[type=hidden]')
                                 .val());
      var idx = this.collection.findIndex(function (elm) {
        return elm.id === id;
      });
      this.collection.splice(idx, 1);
      $('input[name="item_name_' + id + '"]').closest('tr').remove();
    },
    bindEvents: function () {
      $('#add_item').on('click', this.addItem.bind(this));
      $('#inventory').on('blur', ':input', this.updateItem.bind(this));
      $('#inventory').on('click', 'a.delete', this.deleteItem.bind(this));
    },
    init: function () {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };

})();

$(inventory.init.bind(inventory));
