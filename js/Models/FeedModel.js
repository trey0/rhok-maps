var FeedModel = Backbone.Model.extend({
  urlRoot: '/feeds',

  defaults: {
  	/**
  	 * @type {String} Format of the feed being provided.
  	 */
  	type: null,

  	/**
  	 * @type {String} Feed name.
  	 */
  	name: null,

  	/**
  	 * @type {String} URL where the feed can be loaded from.
  	 */
  	url: null,

  	/**
  	 * @type {Boolean} Flag to determine if the KML has been loaded by Google Maps yet.
  	 */
  	isLoaded: false
  },

  /**
   * @type {google.maps.KmlLayer} Map layer to be added to a map.
   */
  mapLayer_: null,

  initialize: function(){
  	this.set({
  		id: this.cid
  	});
  },

  addToMap: function(map){
  	if (!this.mapLayer_)
  		this.mapLayer_ = new google.maps.KmlLayer(this.get('url'), {preserveViewport: true});
	
	var self = this;
	google.maps.event.addListener(this.mapLayer_, 'status_changed', function(){
		if (self.mapLayer_.getStatus() == google.maps.KmlLayerStatus.OK)
			self.set({ isLoaded: true });
	})  	
  	
  	this.mapLayer_.setMap(map);
  },

  removeFromMap: function(){
  	this.mapLayer_.setMap(null);
  }
});

var FeedCollection = Backbone.Collection.extend({
  model: FeedModel,

  url: '/feeds',
});