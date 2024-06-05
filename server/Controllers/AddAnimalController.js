import express from "express"; // Use this if you need to import express elsewhere
import Animal from "../Models/Animal.Model.js";

export const addAnimal = async (req, res) => {
    try {
        const { id, name } = req.body;
        console.log(req.body);
        
        if (!id || !name) {
            return res.status(400).json({ message: "Something is missing" });
        }

        const existingAnimal = await Animal.findOne({ id });
        if (existingAnimal) {
            return res.status(400).json({ message: "Animal already exists" });
        }

        const animal = await Animal.create({ id, name });

        if (!animal) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        return res.status(200).json(animal);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};
