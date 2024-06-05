import express from 'express'
import { addAnimal } from '../Controllers/AddAnimalController.js'
import { updateLocationController } from '../Controllers/UpdateLocation.js';
import { getAnimals } from '../Controllers/getAnimal.js';

const route = express.Router()

route.post('/addAnimal', addAnimal);
route.post('/upadateLocation/:id',updateLocationController)
route.get('/getAnimal', getAnimals)
export default route;