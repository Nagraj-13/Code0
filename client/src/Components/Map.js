// src/Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import cow from '../assests/cow.png'
import deer from '../assests/deer (1).png'
import paws from '../assests/paws.png'
import tiger from '../assests/tiger.png'

// Fix marker icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WebSocketURL = 'ws://localhost:8080'; // Ensure this matches your server URL

const Map = () => {
  const [animalGroups, setAnimalGroups] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(WebSocketURL);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setAnimalGroups(data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const customIcons = [
    new L.Icon({
      iconUrl: cow,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    }),
    new L.Icon({
      iconUrl: deer,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    }),
    new L.Icon({
      iconUrl: paws,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    }),
    new L.Icon({
      iconUrl: tiger,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    }),
  ];

  return (
    <MapContainer center={[15.830555234629164, 74.5129680633545]} zoom={14} style={{ height: '89vh', width: '100%',borderRadius:'15px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {animalGroups.map((animalGroup, i) => (
        animalGroup.animals.map((animal, j) => (
          <Marker key={`${animalGroup.groupID}-${animal.id}-${j}`} position={[animal.loc[animal.loc.length - 1].lat, animal.loc[animal.loc.length - 1].lng]} icon={customIcons[i]}>
            <Popup>
              {animal.name}
            </Popup>
          </Marker>
        ))
      ))}
    </MapContainer>
  );
};

export default Map;
