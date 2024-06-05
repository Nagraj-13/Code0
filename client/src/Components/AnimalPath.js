import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AnimalPath = ({ animalId,radius }) => {
  const [locationHistory, setLocationHistory] = useState([]);
  console.log(radius)
  useEffect(() => {
    // Fetch the animal data
    const fetchAnimalData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/getAnimal`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setLocationHistory(data[2].locationHistory);
      } catch (error) {
        console.error('Error fetching animal data:', error);
      }
    };

    fetchAnimalData();
  }, [animalId]);

  return (
    <MapContainer center={[15.8527, 15.8539]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {locationHistory.length > 0 && (
        <>
          <Polyline positions={locationHistory.map(loc => [loc.lat, loc.lng])} color="blue" />
          {locationHistory.map((loc, idx) => (
            <Marker key={`marker-${idx}`} position={[loc.lat, loc.lng]}></Marker>
          ))}
        </>
        
      )}
     
    </MapContainer>
  );
};

export default AnimalPath;
