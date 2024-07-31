import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.URLMONGODB)
.then(()=>{
    console.log("mongodb conectad")
})
.catch((err)=>{
    console.log(err)
})

export default mongoose
