var MapsetView = Backbone.View.extend({
  tagName: 'ul',
  className: 'currentList',
  
  events: {
  	'click button': 'saveMap_'
  },

  initialize: function(){
    this.model.bind('change', this.render, this);
  },

  render: function(){
  	var template = Handlebars.compile($('#mapsetTemplate').html());

    $(this.el).html(template({
      feeds: this.model.get('feeds').toJSON()
    }));

  	return this;
  },

  saveMap_: function(evt){
    this.model.save();    
  }
});