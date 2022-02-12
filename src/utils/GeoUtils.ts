import * as geolib from 'geolib';

const travelTo = (
  start: { latitude: number; longitude: number },
  distanceMeters: number,
  bearing: number
) => {
  return geolib.computeDestinationPoint(start, distanceMeters, bearing);
};

export default {
  BEARING_EAST: 90,
  BEARING_NORTH: 0,
  BEARING_WEST: 270,
  BEARING_SOUTH: 180,
  travelTo
};
