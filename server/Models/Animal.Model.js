import { timeStamp } from 'console';
import mongoose from 'mongoose';


const AnimalSchema = new mongoose.Schema({
    id: Number,
    name : String,
    groupID : Number,
    location : {
        lat : Number,
        lng : Number
    },
    locationHistory : [{
        lat : Number,
        lng : Number,
    }],
    isWithinFence : Boolean
})

export default mongoose.model('Aniumal',AnimalSchema)




// const animalSchema = new mongoose.Schema({
//   id: Number,
//   groupId: Number,
//   location: [{
//     lat: Number,
//     lng: Number,
//   }],
//   isWithinFence: Boolean,
// });

// const animalGroupSchema = new mongoose.Schema({
//   id: Number,
//   animals: [animalSchema], 
// });

// export default mongoose.model('AnimalGroup', animalGroupSchema);
