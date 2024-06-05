import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose';
import { connectDB } from './config/ConnectDB.js';
import animalRoute from './Routes/AnimalRoute.js'
const app = express();

app.use(express.json())
app.use(cors())


connectDB()
app.use('/api', animalRoute)

app.get("/", (req,res)=>{
    res.send("hello world")
})
app.listen(8000, () =>{
    console.log("Server Started")
})
