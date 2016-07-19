// console.log('main.js is loaded...')
//
// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };
//
// var map;
// function initMap(lat, lng) {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: lat, lng: lng},
//     zoom: 15
//   });
// }
//
// var button = document.querySelector('button');
// button.addEventListener('click', function (ev) {
// ev.preventDefault();
//
// function success(pos) {
//   var crd = pos.coords;
//
//   console.log('Your current position is:');
//   console.log('Latitude : ' + crd.latitude);
//   console.log('Longitude: ' + crd.longitude);
//   console.log('More or less ' + crd.accuracy + ' meters.');
//
//   var latitude = crd.latitude;
//   var longitude = crd.longitude;
//
//   initMap(latitude, longitude);
//
//   function addMarker(location) {
//     marker = new google.maps.Marker({
//       position: location,
//       map: map
//     })
//   }
//
//   var button2 = document.querySelector('.marker');
//   button2.addEventListener('click', function () {
//     var location = new google.maps.LatLng(latitude, longitude);
//     addMarker(location);
//   })
// };
//
// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// };
//
// navigator.geolocation.getCurrentPosition(success, error, options);
//
// })
var infoWindow;
var map;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6
    });
    var infoWindow = new google.maps.InfoWindow({map: map});
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
      };
  infoWindow.setPosition(pos); // set where you are
  infoWindow.setContent('You are here!'); // show by text where you are
  map.setCenter(pos); // set where you are at the center

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pos,
    radius: 500,
    type: ['store']
  }, callback);

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }
  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location

      // google.maps.event.addListener(marker, 'click', function() {
      //   infowindow.setContent(place.name);
      //   infowindow.open(map, this);
      // });
    });
  } // end createMarker

}) //end of current position
    //  google.maps.event.addListener(map, 'tilesloaded', tilesLoaded);
}
     //the above came right from the https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
