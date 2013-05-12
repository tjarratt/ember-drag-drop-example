// create an application to contain our namespaced objects
var App = App || Ember.Application.create({});

// support for drag and drop events
// I know this works in Chrome, but I haven't tested in IE, FF, Safari, etc
var DragNDrop = Ember.Namespace.create();

DragNDrop.cancel = function(event) {
  event.preventDefault();
  return false;
};

DragNDrop.Dragable = Ember.Mixin.create({
  attributeBindings: 'draggable',
  draggable: 'true'
});

DragNDrop.Droppable = Ember.Mixin.create({
  dragEnter: DragNDrop.cancel,
  dragOver: DragNDrop.cancel,
  drop: function(event) {
    var viewId = event.originalEvent.dataTransfer.getData('Text');
    event.preventDefault();
    this.handle_drop_event();
    return false;
  }
});

App.DropTarget = Ember.View.extend(DragNDrop.Droppable);
