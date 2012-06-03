$(function(){
  window.Feeds = new FeedCollection(PRELOAD['feeds']);
  window.CurrentMapSet = new MapsetModel();
  window.Map = new MapView({
  	model: CurrentMapSet,
  	key: 'val'
  });

  Map.render();

  window.FeedsList = new FeedsView({
  	collection: Feeds
  });

  window.MapsetList = new MapsetView({
  	model: CurrentMapSet
  });

  $('#feeds').html(FeedsList.render().el);
  $('#current').html(MapsetList.render().el);
});