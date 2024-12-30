import mongoose from "mongoose";
  async function dbconnect(){
    try {
     await mongoose.connect("process.env.MONGODB_URI");
    } catch (error) {
      console.log("failed to connect", error);
      throw new Error("failed to connect");
    }

  }

  export default dbconnect;



  