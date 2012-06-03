var MapView = Backbone.View.extend({
  /**
   * @type {google.maps.Map} Refernece to the map object for this view.
   */
  map_: null,

  /**
   * @type {Object} Map options to initialize the map with.
   */
  mapOptions_: {
    zoom: 4,
    center: new google.maps.LatLng(35, -95),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  },

  initialize: function(){
  	this.model.on('change', this.updateFeeds_, this);
  },

  render: function(){
  	var mapEl = document.getElementById('map');
  	this.map_ = new google.maps.Map(mapEl, this.mapOptions_);
  },

  remove: function(){
  	this.model.off('change', this.updateFeeds_, this);
  },

  updateFeeds_: function(){
  	var self = this;

  	this.model.get('feeds').each(function(feed){
  		feed.addToMap(self.map_	);
  	});
  }
});