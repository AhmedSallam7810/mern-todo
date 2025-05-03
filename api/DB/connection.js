const mongoose = require("mongoose");

const DBconnection =async()=>{
    await mongoose.connect('mongodb+srv://ahmedSallam:Ah123456@cluster0.zkjgbfo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') //should be process.env.MONGO_URL
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));
}

module.exports = DBconnection;
