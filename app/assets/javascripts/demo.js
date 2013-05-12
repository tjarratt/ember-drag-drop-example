// create an application to contain our namespaced objects
var App = Ember.Application.create({});

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

// support for sentences
App.Sentence = Em.Object.extend({
  title: null,
  sentence: null,
  correct_sentence: null
});

App.SentenceView = Ember.View.extend({
  defaultTemplate: Ember.Handlebars.compile('<div class=container>{{title}}</div><div>{{sentence}}</div>'),

  is_correct: function() {
    return this.get('sentence') === this.get('correct_sentence');
  }.property('sentence', 'correct_sentence'),

  handle_drop_event: function(e) {
    console.log("zomg");
  }
}, DragNDrop.Droppable);

App.sentenceController = Ember.ArrayProxy.create({
  content: []
});

// Quick Hack: set some default content on our Controller
// realistically, this should come from some object our Rails controller
// renders into the page as JSON and then we could parse it here with JSON.parse
var example1 = App.Sentence.create({
  title: 'Example 1',
  sentence: 'The Caltrain, broke down so I was late to work.',
  correct_sentence: 'The Caltrain broke down, so I was late to work.'
});
var example2 = App.Sentence.create({
  title: 'Example 2',
  sentence: 'I love to eat, bread, cheese, and eggs every morning.',
  correct_sentence: 'I love to eat bread, cheese, and eggs every morning.'
});

App.sentenceController.set('content', [example1, example2]);

// Extra Commas View -- provides a place to drag new commas and drop extra commas
var template =
App.ExtraCommasView = Ember.View.extend({
  defaultTemplate: Ember.Handlebars.compile('<div class="box container"><p>,</p></div>')
}, DragNDrop.Dragable);
