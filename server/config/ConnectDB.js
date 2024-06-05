import mongoose from "mongoose";
const URL = 'mongodb+srv://ATS:ATS@cluster0.lroee0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


export const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error: ", error.message);
        process.exit(1);
    }
};
