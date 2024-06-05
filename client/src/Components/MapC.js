import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const animalId = 1; // Assume we're tracking the animal with id 1

  const AddMarkerOnClick = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setMarkers((current) => [...current, [lat, lng]]);

        // Send the location to the backend
        try {
          await axios.post(`http://localhost:8000/api/upadateLocation/3`, {
            lat: lat,
            lng: lng,
          });
        } catch (error) {
          console.error('Error sending location to the backend', error);
        }
      },
    });
    return null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarkerOnClick />
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}></Marker>
      ))}
      {markers.length > 1 && <Polyline positions={markers} color="blue" />}
    </MapContainer>
  );
};

export default MapComponent;
