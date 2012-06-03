var MapsetModel = Backbone.Model.extend({
  urlRoot: '/mapsets',

  defaults: {
  	/**
  	 * @type{Array} Array of feeds that make up this mapset.
  	 */
  	feeds: null
  },

  initialize: function(){
  	this.set({
  		feeds: new FeedCollection()
  	});
  },

  addFeed: function(feedId){
  	var feed = window.Feeds.getByCid(feedId);
  	this.get('feeds').add(feed);
  	this.trigger('change');
  }
});