var FeedsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'feedsList',
  
  events: {
  	'click li': 'loadFeed'
  },

  render: function(){
  	var template = Handlebars.compile($('#feedsTemplate').html());
  	$(this.el).html(template({
  		feeds: this.collection.toJSON()
  	}));

  	return this;
  },

  loadFeed: function(evt){
  	var target = evt.target;
  	CurrentMapSet.addFeed($(target).attr('data-id'));
  }
});