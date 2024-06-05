import React from 'react';
import { Marker } from 'leaflet';

const Animal = ({ animal }) => {
  const position = [animal.location.lat, animal.location.lng];
  return <Marker position={position} />;
};

export default Animal;
