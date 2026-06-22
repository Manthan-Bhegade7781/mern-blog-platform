const mongoose= require("mongoose");

const connectionDB= async(LINK)=>{
    await mongoose.connect(LINK);
    console.log("MongoDB Started Successfully..!!");
};

module.exports={
    connectionDB
};