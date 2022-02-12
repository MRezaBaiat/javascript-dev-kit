declare const _default: {
    BEARING_EAST: number;
    BEARING_NORTH: number;
    BEARING_WEST: number;
    BEARING_SOUTH: number;
    travelTo: (start: {
        latitude: number;
        longitude: number;
    }, distanceMeters: number, bearing: number) => {
        latitude: number;
        longitude: number;
    };
};
export default _default;
