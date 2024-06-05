import Animal from "../Models/Animal.Model.js";

export const getAnimals = async(req,res) =>{

    try {
        const animals = await Animal.find();
        if(animals.length===0){
            res.status(404).json({message:"No animals found"});
        }
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json(error);
    }
}