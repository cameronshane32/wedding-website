function initMap() {
  let stonewall = {lat: 50.1412076, lng: -97.3254985};
  let map = new google.maps.Map(
    document.getElementById('map'), {zoom: 15, center: stonewall});
  let marker = new google.maps.Marker({position: stonewall, map: map});
}
