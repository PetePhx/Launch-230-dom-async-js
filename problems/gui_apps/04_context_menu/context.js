var todo_items = [{id: 1, title: 'Homework'},
                  {id: 2, title: 'Shopping'},
                  {id: 3, title: 'Calling Mom'},
                  {id: 4, title: 'Coffee with John'}];

var $confirmModal = $('<div class="confirm"><div>');
$confirmModal.append($('<p>Are you sure you want to delete this todo?</p>'))
$confirmModal.append($('<a href="#" class="confirm yes">yes</a>'));
$confirmModal.append($('<a href="#" class="confirm no">no</a>'));

var $menu = $('<ul class="menu"></ul>');
$menu.append('<li class="menu edit">Edit</li>');
$menu.append('<li class="menu details">Show Details</li>');
$menu.append('<li class="menu delete">Delete</li>');

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
    $('ul.todos').on('contextmenu', 'li.item', this.displayMenu);
    $('ul.todos').on('click', 'li.menu', this.proceedMenuAction);
  },

  promptConfirm: function (e) {
    e.preventDefault();
    var $target = $(e.target);
    var $li = $target.closest('li.item');
    $li.append($confirmModal.clone());
  },

  proceedDelete: function (e) {
    e.preventDefault();
    var $target = $(e.target);
    var yes = $target.hasClass('yes');
    yes ? $target.closest('li.item').remove() : $target.closest('div.confirm').remove();
  },

  displayMenu: function (e) {
    e.preventDefault();
    var $target = $(e.target);
    $target.append($menu.clone());
  },

  proceedMenuAction: function (e) {
    e.preventDefault();
    var $target = $(e.target);
    var yes = $target.hasClass('delete');
    if (yes) {
      // $target.closest('li.item').remove();
      $target.closest('ul.menu').hide();
      $target.closest('li.item').find('a.delete_button').trigger('click');
    } else {
       $target.closest('ul.menu').remove();
    }
  },
};

$(function () {
  todosApp.init();
});
