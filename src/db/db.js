import mongoose from "mongoose";
import 'dotenv/config';

const connectToDb = async () => {
  try {
     const connect = await mongoose.connect(process.env.MONGO_URL);
     if(connect) {
      console.log("Connected to MongoDB successfully");
     }
     else {
      console.log("Failed to connect to MongoDB");
     }
  }
  catch(error){
    console.log(error);
  }
}

export default connectToDb;