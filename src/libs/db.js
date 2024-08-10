import mongoose from "mongoose";
import config from '../config.js';

mongoose.connect(config.url_mongodb)
.then(()=>{
    console.log("mongodb conectad")
})
.catch((err)=>{
    console.log(err)
})

export default mongoose
