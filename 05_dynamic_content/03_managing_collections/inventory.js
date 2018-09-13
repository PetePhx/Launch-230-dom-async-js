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
    addItem: function (e) {
      e.preventDefault();
      inventory.lastId += 1;
      $('#inventory').append(inventory.template
                             .replace(/ID/g, inventory.lastId));
      inventory.collection.push({
        id: inventory.lastId,
        name: '',
        stockNumber: '',
        quantity: 1,
      });
    },
    lastId: 0,
    updateItem: function (e) {
      var id = Number($(e.target).attr('name').slice(-1));
      var item = inventory.collection.find(function (elm) {
        return elm.id === id;
      });
      item.name = $('input[name="item_name_' + id + '"]').val();
      item.stockNumber = $('input[name="item_stock_number_' + id + '"]').val();
      item.quantity = Number($('input[name="item_quantity_' + id + '"]').val());
    },
    deleteItem: function (e) {
      e.preventDefault();
      var id = Number($(e.target).closest('tr')
                                  .find('td input')
                                  .eq(0)
                                  .attr('name')
                                  .slice(-1));
      var idx = inventory.collection.findIndex(function (elm) {
        return elm.id === id;
      });
      inventory.collection.splice(idx, 1);
      $('input[name="item_name_' + id + '"]').closest('tr').remove();
    },
    init: function () {
      this.setDate();
      this.cacheTemplate();
      $('#add_item').on('click', this.addItem);
      $('#inventory').on('blur', 'input', this.updateItem);
      $('#inventory').on('click', 'a', this.deleteItem);
    }
  };

})();

$(inventory.init.bind(inventory));
