const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 });

const bounds = [
  { minLat: 15.8527, maxLat: 15.8539, minLng: 74.4872, maxLng: 74.4894 }, // Vadgaon
  { minLat: 15.8377, maxLat: 15.8399, minLng: 74.5092, maxLng: 74.5104 }, // Angol
  { minLat: 15.8269, maxLat: 15.8291, minLng: 74.4822, maxLng: 74.4844 }, // Majgaon
  { minLat: 15.8357, maxLat: 15.8389, minLng: 74.4842, maxLng: 74.4874 }, // Tilakwadi
];

function getRandomLocation(bounds) {
  const lat = (Math.random() * (bounds.maxLat - bounds.minLat) + bounds.minLat).toFixed(5);
  const lng = (Math.random() * (bounds.maxLng - bounds.minLng) + bounds.minLng).toFixed(5);
  return { lat: parseFloat(lat), lng: parseFloat(lng) };
}

// Initial data generation
const data = bounds.map((bound, index) => ({
  groupID: index + 1,
  groupName: `Group ${index + 1}`,
  animals: Array.from({ length: 7 }, (v, i) => ({
    id: i + 1,
    name: `Animal ${i + 1}`,
    loc: Array.from({ length: 25 }, () => getRandomLocation(bound))
  }))
}));

// Function to update animal locations to simulate roaming
function updateAnimalLocations() {
  data.forEach((group, groupIndex) => {
    const bound = bounds[groupIndex];
    group.animals.forEach(animal => {
      const movementRange = 0.0015; // Define how far an animal can move each interval
      const lastLocation = animal.loc[animal.loc.length - 1];
      const newLat = lastLocation.lat + (Math.random() * movementRange - movementRange / 2);
      const newLng = lastLocation.lng + (Math.random() * movementRange - movementRange / 2);
      
      // Ensure animals stay within the boundaries
      const boundedLat = Math.min(Math.max(newLat, bound.minLat), bound.maxLat);
      const boundedLng = Math.min(Math.max(newLng, bound.minLng), bound.maxLng);
      
      animal.loc.push({ lat: boundedLat, lng: boundedLng });

      // Optionally limit the number of stored locations to a certain amount
      if (animal.loc.length > 25) animal.loc.shift();
    });
  });
}

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Send initial data
  ws.send(JSON.stringify(data));
  
  const intervalId = setInterval(() => {
    updateAnimalLocations();
    ws.send(JSON.stringify(data));
  }, 3000);

  ws.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
