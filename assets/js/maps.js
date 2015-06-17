"use strict";
var $ = jQuery.noConflict();

var mapStyles = [

  {"featureType": "poi","stylers": [{ "visibility": "off" }]},
  {"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},
  {"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},
  {"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},
  {"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"on"},{"lightness":10}]},
  {"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},
  {"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},
  {"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},
  {"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":50}]},
  {"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]},
  {"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},
  {"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},
  {"featureType":'road.highway',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:60},{visibility:'on'}]},
  {"featureType":'landscape.natural',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-71},{lightness:-18},{visibility:'on'}]}
];

// Set map height to 100% ----------------------------------------------------------------------------------------------

var $body = $('body');
if( $body.hasClass('map-fullscreen') ) {
  if( $(window).width() > 768 ) {

    $('.map-canvas').height( $(window).height() - $('.header').height() );
  }
  else {
    $('.map-canvas #map').height( $(window).height() - $('.header').height() );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Homepage map - Google
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawInfobox(category, infoboxContent, json, i){

  if(json.data[i].color)          { var color = json.data[i].color }
    else                        { color = '' }
  if( json.data[i].price )        { var price = '<div class="price">' + json.data[i].price +  '</div>' }
    else                        { price = '' }
  if(json.data[i].id)             { var id = json.data[i].id }
    else                        { id = '' }
  if(json.data[i].url)            { var url = json.data[i].url }
    else                        { url = '' }
  if(json.data[i].urlTwitter)            { var urlTwitter = json.data[i].urlTwitter }
    else                        { urlTwitter = '' }
  if(json.data[i].type)           { var type = json.data[i].type }
    else                        { type = '' }
  if(json.data[i].title)          { var title = json.data[i].title }
    else                        { title = '' }
  if(json.data[i].location)       { var location = json.data[i].location }
    else                        { location = '' }
  if(json.data[i].gallery[0])     { var gallery = json.data[i].gallery[0] }
    else                        { gallery[0] = '../img/default-item.jpg' }

  var ibContent = '';
  ibContent =
  '<div class="infobox ' + color + '">' +
    '<div class="inner">' +
      '<div class="image">' +
        // '<div class="item-specific">' + drawItemSpecific(category, json, i) + '</div>' +
        '<div class="overlay">' +
          '<div class="wrapper">' +
            '<a target="_blank" href="' + url +  '" class="detail">Site web</a>' +
            '<hr>' +
            '<a target="_blank" href="' + urlTwitter +  '" class="detail">Page twitter</a>' +
          '</div>' +
        '</div>' +
        '<a href="' + url +  '" class="description">' +
          '<div class="meta">' +
            price +
            '<h2>' + title +  '</h2>' +
            '<figure>' + location +  '</figure>' +
            '<i class="fa fa-angle-right"></i>' +
          '</div>' +
        '</a>' +
        '<img src="' + gallery +  '">' +
      '</div>' +
    '</div>' +
  '</div>';

  return ibContent;
}

function createHomepageGoogleMap(_latitude,_longitude,json){
  var zoom = 17;

  if ( $(window).width() <= 1000 ) {
    zoom = 17;
  }
  if ( $(window).width() <= 500 ) {
    zoom = 16;
  }

  gMap();

  function gMap(){
    var mapCenter = new google.maps.LatLng(_latitude, _longitude);
    var mapOptions = {
      draggable: $(window).width() >= 450 ? true : false,
      zoom: zoom,
      center: mapCenter,
      disableDefaultUI: true,
      scrollwheel: false,
      styles: mapStyles,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER
      },
      panControl: false,
      zoomControl: true,
      disableDoubleClickZoom: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var newMarkers = [];
    var markerClicked = 0;
    var activeMarker = false;
    var lastClicked = false;

    for (var i = 0; i < json.data.length; i++) {

      // Google map marker content -----------------------------------------------------------------------------------

      if( json.data[i].color ) var color = json.data[i].color;
      else color = '';

      var markerContent = document.createElement('DIV');
      if( json.data[i].featured == 1 ) {
        markerContent.innerHTML =
          '<div class="map-marker featured' + color + '">' +
            '<div class="icon">' +
            '<img src="' + json.data[i].type_icon +  '">' +
            '</div>' +
          '</div>';
      }
      else {
        markerContent.innerHTML =
          '<div class="map-marker ' + json.data[i].color + '">' +
            '<div class="icon">' +
            '<img src="' + json.data[i].type_icon +  '">' +
            '</div>' +
          '</div>';
      }

      // Create marker on the map ------------------------------------------------------------------------------------

      var marker = new RichMarker({
        position: new google.maps.LatLng( json.data[i].latitude, json.data[i].longitude ),
        map: map,
        draggable: false,
        content: markerContent,
        flat: true
      });

      newMarkers.push(marker);

      // Create infobox for marker -----------------------------------------------------------------------------------

      var infoboxContent = document.createElement("div");
      var infoboxOptions = {
        content: infoboxContent,
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(-18, -42),
        zIndex: null,
        alignBottom: true,
        boxClass: "infobox",
        enableEventPropagation: true,
        closeBoxMargin: "0px 0px -30px 0px",
        closeBoxURL: "assets/img/close.png",
        infoBoxClearance: new google.maps.Size(1, 1)
      };

      // Infobox HTML element ----------------------------------------------------------------------------------------

      var category = json.data[i].category;
      infoboxContent.innerHTML = drawInfobox(category, infoboxContent, json, i);

      // Create new markers ------------------------------------------------------------------------------------------

      newMarkers[i].infobox = new InfoBox(infoboxOptions);

      // Show infobox after click ------------------------------------------------------------------------------------

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          google.maps.event.addListener(map, 'click', function(event) {
            lastClicked = newMarkers[i];
          });
          activeMarker = newMarkers[i];
          if( activeMarker != lastClicked ){
            for (var h = 0; h < newMarkers.length; h++) {
              newMarkers[h].content.className = 'marker-loaded';
              newMarkers[h].infobox.close();
            }
            newMarkers[i].infobox.open(map, this);
            newMarkers[i].infobox.setOptions({ boxClass:'fade-in-marker'});
            newMarkers[i].content.className = 'marker-active marker-loaded';
            markerClicked = 1;
          }
        }
      })(marker, i));

      // Fade infobox after close is clicked -------------------------------------------------------------------------

      google.maps.event.addListener(newMarkers[i].infobox, 'closeclick', (function(marker, i) {
        return function() {
          activeMarker = 0;
          newMarkers[i].content.className = 'marker-loaded';
          newMarkers[i].infobox.setOptions({ boxClass:'fade-out-marker' });
        }
      })(marker, i));
    }

    // Close infobox after click on map --------------------------------------------------------------------------------

    google.maps.event.addListener(map, 'click', function(event) {
      if( activeMarker != false && lastClicked != false ){
        if( markerClicked == 1 ){
          activeMarker.infobox.open(map);
          activeMarker.infobox.setOptions({ boxClass:'fade-in-marker'});
          activeMarker.content.className = 'marker-active marker-loaded';
        }
        else {
          markerClicked = 0;
          activeMarker.infobox.setOptions({ boxClass:'fade-out-marker' });
          activeMarker.content.className = 'marker-loaded';
          setTimeout(function() {
            activeMarker.infobox.close();
          }, 350);
        }
        markerClicked = 0;
      }
      if( activeMarker != false ){
        google.maps.event.addListener(activeMarker, 'click', function(event) {
          markerClicked = 1;
        });
      }
      markerClicked = 0;
    });

    // Create marker clusterer -----------------------------------------------------------------------------------------

    // var clusterStyles = [
    //   {
    //     url: 'assets/img/cluster.png',
    //     height: 34,
    //     width: 34
    //   }
    // ];

    // var markerCluster = new MarkerClusterer(map, newMarkers, { styles: clusterStyles, maxZoom: 19 });
    // markerCluster.onClick = function(clickedClusterIcon, sameLatitude, sameLongitude) {
    //   return multiChoice(sameLatitude, sameLongitude, json);
    // };

    // Dynamic loading markers and data from JSON ----------------------------------------------------------------------

    google.maps.event.addListener(map, 'idle', function() {
      var visibleArray = [];
      for (var i = 0; i < json.data.length; i++) {
        if ( map.getBounds().contains(newMarkers[i].getPosition()) ){
          visibleArray.push(newMarkers[i]);
          $.each( visibleArray, function (i) {
            setTimeout(function(){
              if ( map.getBounds().contains(visibleArray[i].getPosition()) ){
                if( !visibleArray[i].content.className ){
                  visibleArray[i].setMap(map);
                  visibleArray[i].content.className += 'bounce-animation marker-loaded';
                  // markerCluster.repaint();
                }
              }
            }, i * 50);
          });
        } else {
          newMarkers[i].content.className = '';
          newMarkers[i].setMap(null);
        }
      }

      var visibleItemsArray = [];
      $.each(json.data, function(a) {
        if( map.getBounds().contains( new google.maps.LatLng( json.data[a].latitude, json.data[a].longitude ) ) ) {
          var category = json.data[a].category;
          pushItemsToArray(json, a, category, visibleItemsArray);
        }
      });

      // Create list of items in Results sidebar ---------------------------------------------------------------------
      $('.items-list .results').html( visibleItemsArray );
    });

    redrawMap('google', map);


  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item Detail Map - Google
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function itemDetailMap(json){
  var mapCenter = new google.maps.LatLng(json.latitude,json.longitude);
  var mapOptions = {
    zoom: 14,
    center: mapCenter,
    disableDefaultUI: true,
    scrollwheel: false,
    styles: mapStyles,
    panControl: false,
    zoomControl: false,
    draggable: true
  };
  var mapElement = document.getElementById('map-detail');
  var map = new google.maps.Map(mapElement, mapOptions);
  if( json.type_icon ) var icon = '<img src="' + json.type_icon +  '">';
  else icon = '';

  // Google map marker content -----------------------------------------------------------------------------------

  var markerContent = document.createElement('DIV');
  markerContent.innerHTML =
    '<div class="map-marker">' +
      '<div class="icon">' +
      icon +
      '</div>' +
    '</div>';

  // Create marker on the map ------------------------------------------------------------------------------------

  var marker = new RichMarker({
    position: new google.maps.LatLng( json.latitude, json.longitude ),
    map: map,
    draggable: false,
    content: markerContent,
    flat: true
  });

  marker.content.className = 'marker-loaded';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Simple Google Map (contat, submit...)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function simpleMap(_latitude, _longitude, draggableMarker){
  var mapCenter = new google.maps.LatLng(_latitude, _longitude);
  var mapOptions = {
    zoom: 14,
    center: mapCenter,
    disableDefaultUI: true,
    scrollwheel: false,
    styles: mapStyles,
    panControl: false,
    zoomControl: false,
    draggable: true
  };
  var mapElement = document.getElementById('map-simple');
  var map = new google.maps.Map(mapElement, mapOptions);

  // Google map marker content -----------------------------------------------------------------------------------

  var markerContent = document.createElement('DIV');
  markerContent.innerHTML =
    '<div class="map-marker">' +
      '<div class="icon"></div>' +
    '</div>';

  // Create marker on the map ------------------------------------------------------------------------------------

  var marker = new RichMarker({
    //position: mapCenter,
    position: new google.maps.LatLng( _latitude, _longitude ),
    map: map,
    draggable: draggableMarker,
    content: markerContent,
    flat: true
  });

  marker.content.className = 'marker-loaded';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Push items to array and create <li> element in Results sidebar ------------------------------------------------------

function pushItemsToArray(json, a, category, visibleItemsArray){
  var itemPrice;
  visibleItemsArray.push(
    '<li>' +
      '<div class="item" id="' + json.data[a].id + '">' +
        '<a href="#" class="image">' +
          '<div class="inner">' +
            // '<div class="item-specific">' +
            //   drawItemSpecific(category, json, a) +
            // '</div>' +
            '<img src="' + json.data[a].gallery[0] + '" alt="">' +
          '</div>' +
        '</a>' +
        '<div class="wrapper">' +
          '<a href="#" id="' + json.data[a].id + '"><h3>' + json.data[a].title + '</h3></a>' +
          '<figure>' + json.data[a].location + '</figure>' +
          drawPrice(json.data[a].price) +
          '<div class="info">' +
            '<div class="type">' +
              '<i><img src="' + json.data[a].type_icon + '" alt=""></i>' +
              '<span>' + json.data[a].type + '</span>' +
            '</div>' +
            '<div class="rating" data-rating="' + json.data[a].rating + '"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</li>'
  );

  function drawPrice(price){
    if( price ){
      itemPrice = '<div class="price">' + price +  '</div>';
      return itemPrice;
    }
    else {
      return '';
    }
  }
}

// Center map to marker position if function is called (disabled) ------------------------------------------------------

function centerMapToMarker(){
  $.each(json.data, function(a) {
    if( json.data[a].id == id ) {
      var _latitude = json.data[a].latitude;
      var _longitude = json.data[a].longitude;
      var mapCenter = new google.maps.LatLng(_latitude,_longitude);
      map.setCenter(mapCenter);
    }
  });
}

// Create modal if more items are on the same location (example: one building with floors) -----------------------------

function multiChoice(sameLatitude, sameLongitude, json) {
  //if (clickedCluster.getMarkers().length > 1){
    var multipleItems = [];
    $.each(json.data, function(a) {
      if( json.data[a].latitude == sameLatitude && json.data[a].longitude == sameLongitude ) {
        pushItemsToArray(json, a, json.data[a].category, multipleItems);
      }
    });
    $('body').append('<div class="modal-window multichoice fade_in"></div>');
    $('.modal-window').load( 'assets/external/_modal-multichoice.html', function() {
      $('.modal-window .modal-wrapper .items').html( multipleItems );
      rating('.modal-window');
    });
    $('.modal-window .modal-background, .modal-close').live('click',  function(e){
      $('.modal-window').addClass('fade_out');
      setTimeout(function() {
        $('.modal-window').remove();
      }, 300);
    });
  //}
}

// Animate OSM marker --------------------------------------------------------------------------------------------------

function animateOSMMarkers(map, loadedMarkers, json){
  var bounds = map.getBounds();
  var visibleItemsArray = [];
  var multipleItems = [];

  $.each( loadedMarkers, function (i) {
    if ( bounds.contains( loadedMarkers[i].getLatLng() ) ) {
      var category = json.data[i].category;
      pushItemsToArray(json, i, category, visibleItemsArray);

      setTimeout(function(){
        if( loadedMarkers[i]._icon != null ){
          loadedMarkers[i]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable bounce-animation marker-loaded';
        }
      }, i* 50);
    }
    else {
      if( loadedMarkers[i]._icon != null ){
        loadedMarkers[i]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable';
      }
    }
  });

  // Create list of items in Results sidebar -------------------------------------------------------------------------

  $('.items-list .results').html( visibleItemsArray );

  rating('.results .item');

}

// Redraw map after item list is closed --------------------------------------------------------------------------------

function redrawMap(mapProvider, map){
  $('.map .toggle-navigation').click(function() {
    $('.map-canvas').toggleClass('results-collapsed');
    $('.map-canvas .map').one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      if( mapProvider == 'osm' ){
        map.invalidateSize();
      }
      else if( mapProvider == 'google' ){
        google.maps.event.trigger(map, 'resize');
      }
    });
  });
}
