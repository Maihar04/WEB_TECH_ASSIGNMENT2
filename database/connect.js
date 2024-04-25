import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb+srv://maihararora0269:maihar04@cluster0.rirzetf.mongodb.net/", {
        dbName: "hotel"
    })
    .then(() => {
        console.log("Database Connected")
    })
    .catch((error) => {
        console.log(error)
    })
}