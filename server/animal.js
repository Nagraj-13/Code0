const Animal = function(id, groupId, location, isWithinFence) {
    this.id = id;
    this.groupId = groupId;
    this.location = { lat: 0, lng: 0 }; // Initial location
    this.isWithinFence = true; // Initially within the fence
    this.updateLocation(location); // Update with initial location
  };
  
  Animal.prototype.updateLocation = function(newLocation) {
    this.location = newLocation;
    this.isWithinFence = this.checkWithinFence(newLocation); // Check if within fence
  };
  
  Animal.prototype.checkWithinFence = function(location) {
    // Implement your fence boundary logic here
    // Example: Check if location falls within a circular fence
    const center = { lat: 74.4608, lng: 15.8127 };
    const radius = 50;
    const distance = Math.sqrt(Math.pow(location.lat - center.lat, 2) + Math.pow(location.lng - center.lng, 2));
    return distance <= radius;
  };
  
  module.exports = Animal;
  