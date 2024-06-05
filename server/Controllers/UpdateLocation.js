import Animal from "../Models/Animal.Model.js";
export  const updateLocationController = async(req,res) => {
    const { id } = req.params;
    const { lat, lng } = req.body;
  
    try {
      const animal = await Animal.findOne({ id: id });
      if (animal) {
        animal.locationHistory.push({ lat, lng });
        await animal.save();
        res.status(200).json(animal);
      } else {
        res.status(404).json({ message: 'Animal not found' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
}