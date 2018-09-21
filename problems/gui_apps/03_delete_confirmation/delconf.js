var todo_items = [{id: 1, title: 'Homework'},
                  {id: 2, title: 'Shopping'},
                  {id: 3, title: 'Calling Mom'},
                  {id: 4, title: 'Coffee with John'}];

var $confirmModal = $('<div class="confirm"><div>');
$confirmModal.append($('<p>Are you sure you want to delete this todo?</p>'))
$confirmModal.append($('<a href="#" class="confirm yes">yes</a>'));
$confirmModal.append($('<a href="#" class="confirm no">no</a>'));

var todosApp = {
  init: function () {
    this.buildTemplates();
    this.buildHtml();
    this.attachListeners();
  },

  buildTemplates: function () {
    this.listTemplate = Handlebars.compile($('#todo_list').html());
    Handlebars.registerPartial('todo_item', $('#todo_item').html());
  },

  buildHtml: function () {
    var htmlList = this.listTemplate({items: todo_items});
    $('main').append(htmlList);
  },

  listTemplate: null,

  attachListeners: function () {
    $('ul.todos').on('click', 'a.delete_button', this.promptConfirm);
    $('ul.todos').on('click', 'a.confirm', this.proceedDelete);
  },

  promptConfirm: function (e) {
    e.preventDefault();
    var $target = $(e.target);
    var $li = $target.closest('li');
    $li.append($confirmModal.clone());
  },

  proceedDelete: function (e) {
    e.preventDefault();
    var $target = $(e.target);
    var yes = $target.hasClass('yes');
    yes ? $target.closest('li').remove() : $target.closest('div.confirm').remove();
  },
};

$(function () {
  todosApp.init();
});
