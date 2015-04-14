!(function() {

  /* ------------------------------------------------------------ */
  /* --------------------- Google Maps -------------------------- */
  /* ------------------------------------------------------------ */

  var MY_MAPTYPE_ID = 'lesentierstyle';
  var map;

  function initialize() {

    var stylez = [{
      "featureType": "all",
      "elementType": "geometry.stroke",
      "stylers": [{
        "lightness": "100"
      }, {
        "color": "#475258"
      }, {
        "gamma": "10.00"
      }, {
        "saturation": "-100"
      }, {
        "weight": "0.50"
      }]

    },{
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#ffffff"
      }, {
        "weight": "4.02"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "administrative.province",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "weight": "2.51"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
          "color": "#475258"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "color": "#f2f2f2"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffffff"
      }, {
        "lightness": "100"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#ff0000"
      }]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 45
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#e86659"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [{
        "color": "#ffffff"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#e86659"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#475258"
      }]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "color": "#f0f5f2"
      }, {
        "visibility": "on"
      }]
    }];

    var myCenter = new google.maps.LatLng(48.867636, 2.351317);
    var image = 'images/marker.png';
    var marker = new google.maps.Marker({
      position: myCenter,
      title: 'Le Sentier',
      // icon: image
    });

    var mapProp = {
      center: myCenter,
      zoom: 15,
      draggable: false,
      scrollwheel: false,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      featureType: 'road',
      mapTypeId: MY_MAPTYPE_ID
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapProp);
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
      // infowindow.setContent(contentString);
      // infowindow.open(map, marker);
    });

    var styledMapOptions = {
      // name: "My style"
    };

    var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, jayzMapType);

  };

  var mapCanvas = document.getElementById('map-canvas');

  mapCanvas.addEventListener('click', function () {

    var numaMarker = new google.maps.LatLng(48.868451, 2.352168);
    var paillasseMarker = new google.maps.LatLng(48.867721, 2.34963);
    var playerMarker = new google.maps.LatLng(48.8675012, 2.3512478);

    var markerNuma = new google.maps.Marker({
      position: numaMarker,
      map: map,
      title: 'NUMA!'
    });
    var markerPaillasse = new google.maps.Marker({
      position: paillasseMarker,
      map: map,
      title: 'La Paillasse!'
    });
    var markerPlayer = new google.maps.Marker({
      position: playerMarker,
      map: map,
      title: 'PLAYER!'
    });

    markerNuma.setMap(map);
    markerPaillasse.setMap(map);
    markerPlayer.setMap(map);

  }, false);

  // INITIALIZERS

  /* Google Map
  ------------------------------------------------------------- */
  if (document.getElementById('map-canvas')){
    initialize();
  }

})();
