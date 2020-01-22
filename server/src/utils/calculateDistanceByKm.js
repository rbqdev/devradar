function deg2rad(deg) {
  return deg * (Math.PI/180);
}

module.exports = function getDistanceFromLatLonInKm(centerCoordinates, pointCoordinates) {
  const radius = 6371;

  const { latitude: lat1, longitude: long1 } = centerCoordinates;
  const { latitude: lat2, longitude: long2 } = pointCoordinates;

  const dLat = deg2rad(lat2-lat1);
  const dLong = deg2rad(long2-long1);

  const calc =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLong/2) * Math.sin(dLong/2)
  ;

  const center = 2 * Math.atan2(Math.sqrt(calc), Math.sqrt(1-calc));
  const distance = radius * center;

  return distance;
}