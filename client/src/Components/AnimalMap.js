import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnimalMap = ({ radius,showNotification }) => {
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getAnimal');
        const data = await response.json();
        setAnimalData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching animal data:', error);
      }
    };

    fetchAnimalData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimalData(prevAnimalData => {
        return prevAnimalData.map(animal => {
          if (animal.locationHistory.length > 0) {
            const newLocationHistory = [...animal.locationHistory];
            const nextCoordinateIndex = newLocationHistory.findIndex(loc => !loc.marked);
            if (nextCoordinateIndex !== -1) {
              newLocationHistory[nextCoordinateIndex].marked = true;
              // Check if the latest coordinate is outside the radius
              const latestCoordinate = newLocationHistory[nextCoordinateIndex];
              if (isOutsideRadius(latestCoordinate, [15.8645, 74.5], radius)) {
                showNotification(`Animal ${animal.id} has moved outside the defined radius!`);
              }
            }
            return {
              ...animal,
              locationHistory: newLocationHistory
            };
          }
          return animal;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [radius]);

  const isOutsideRadius = (coordinate, center, radius) => {
    const distance = calculateDistance(center, [coordinate.lat, coordinate.lng]);
    return distance > radius;
  };

  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLng = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  const renderMarkersAndPath = (locationHistory) => {
    const markedCoordinates = locationHistory.filter(loc => loc.marked);
    if (markedCoordinates.length > 0) {
      const latestCoordinate = markedCoordinates[markedCoordinates.length - 1];
      const positions = markedCoordinates.map(loc => [loc.lat, loc.lng]);

      return (
        <>
          <Marker position={[latestCoordinate.lat, latestCoordinate.lng]}>
            <Popup>
              <b>Animal Location</b>
            </Popup>
          </Marker>
          <Polyline positions={positions} color="blue" />
        </>
      );
    }
    return null;
  };

  const fillBlueOptions = { fillColor: "Blue" };

  return (
    <>
      
      <MapContainer center={[15.830555234629164, 74.5129680633545]} zoom={12} style={{ height: '89vh', width: '100%',borderRadius:'15px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle
          center={[15.8645, 74.5]}
          pathOptions={fillBlueOptions}
          radius={radius}
        />
        {animalData.map(animal => (
          animal.locationHistory.length > 0 && (
            <React.Fragment key={animal.id}>
              {renderMarkersAndPath(animal.locationHistory)}
            </React.Fragment>
          )
        ))}
      </MapContainer>
    </>
  );
};

export default AnimalMap;
