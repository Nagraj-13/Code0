// server.js
// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// function getRandomLocationInBelagavi() {
//   const belagaviBounds = {
//     minLat: 15.8127,
//     maxLat: 15.9165,
//     minLng: 74.4608,
//     maxLng: 74.5405
//   };

//   const lat = (Math.random() * (belagaviBounds.maxLat - belagaviBounds.minLat) + belagaviBounds.minLat).toFixed(5);
//   const lng = (Math.random() * (belagaviBounds.maxLng - belagaviBounds.minLng) + belagaviBounds.minLng).toFixed(5);

//   return { lat: parseFloat(lat), lng: parseFloat(lng) };
// }

// // Initial animal data generation
// const animals = Array.from({ length: 7 }, (v, i) => ({
//   id: i + 1,
//   name: 'Animal ' + (i + 1),
//   ...getRandomLocationInBelagavi()
// }));


// const animalGroup = Array.from({length: 4}, (v, i) =>({
//   id: i+1,
//   name: 'animalgroup' + (i+1),
//   ...animals,
// }))

// // Function to update animal locations to simulate roaming
// function updateAnimalLocations() {
//   animals.forEach(animal => {
//     const movementRange = 0.005; // Define how far an animal can move each interval
//     animal.lat += (Math.random() * movementRange - movementRange / 2);
//     animal.lng += (Math.random() * movementRange - movementRange / 2);

//     // Ensure animals stay within the boundaries
//     if (animal.lat < 15.8127) animal.lat = 15.8127;
//     if (animal.lat > 15.9165) animal.lat = 15.9165;
//     if (animal.lng < 74.4608) animal.lng = 74.4608;
//     if (animal.lng > 74.5405) animal.lng = 74.5405;
//   });
// }

// wss.on('connection', (ws) => {
//   console.log('New client connected');
  
//   // Send initial data
//   ws.send(JSON.stringify(animalGroup));
  
//   const intervalId = setInterval(() => {
//     updateAnimalLocations();
//     ws.send(JSON.stringify(animalGroup));
//   }, 1000);

//   ws.on('close', () => {
//     clearInterval(intervalId);
//     console.log('Client disconnected');
//   });
// });

// console.log('WebSocket server is running on ws://localhost:8080');


// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// function getRandomLocationInBelagavi() {
//   const belagaviBounds = {
//     minLat: 15.8127,
//     maxLat: 15.9165,
//     minLng: 74.4608,
//     maxLng: 74.5405
//   };

//   const lat = (Math.random() * (belagaviBounds.maxLat - belagaviBounds.minLat) + belagaviBounds.minLat).toFixed(5);
//   const lng = (Math.random() * (belagaviBounds.maxLng - belagaviBounds.minLng) + belagaviBounds.minLng).toFixed(5);

//   return { lat: parseFloat(lat), lng: parseFloat(lng) };
// }

// // Define the number of animal groups
// const numAnimalGroups = 4;

// // Create animal groups with random animal count (4-7)
// const animalGroups = [];
// for (let i = 0; i < numAnimalGroups; i++) {
//   const numAnimals = Math.floor(Math.random() * 4) + 4; // 4 to 7 animals per group
//   const animals = [];
//   for (let j = 0; j < numAnimals; j++) {
//     const animal = {
//       id: j + 1, // Unique ID within the group (optional, adjust as needed)
//       name: `Animal ${i + 1}-${j + 1}`, // Group and animal number in the name
//       ...getRandomLocationInBelagavi()
//     };
//     animals.push(animal);
//   }
//   animalGroups.push({ id: i + 1, animals }); // Group ID
// }

// const intervalId = setInterval(() => {
//   // Update animal locations within each group
//   animalGroups.forEach(group => {
//     group.animals.forEach(animal => {
//       const movementRange = 0.0005;
//       animal.lat += (Math.random() * movementRange - movementRange / 2);
//       animal.lng += (Math.random() * movementRange - movementRange / 2);

//       // Ensure animals stay within the boundaries
//       if (animal.lat < 15.8127) animal.lat = 15.8127;
//       if (animal.lat > 15.9165) animal.lat = 15.9165;
//       if (animal.lng < 74.4608) animal.lng = 74.4608;
//       if (animal.lng > 74.5405) animal.lng = 74.5405;
//     });
//   });

//   // Send updated animal groups to clients
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(animalGroups));
//     }
//   });
// }, 1000);

// wss.on('connection', (ws) => {
//   console.log('New client connected');

//   // Send initial data (all animal groups)
//   ws.send(JSON.stringify(animalGroups));

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// console.log('WebSocket server is running on ws://localhost:8080');


import WebSocket from "ws";

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
      const movementRange = 0.005; // Define how far an animal can move each interval
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
  }, 1000);

  ws.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
