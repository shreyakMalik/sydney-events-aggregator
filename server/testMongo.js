import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB CONNECTED");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ MongoDB FAILED");
    console.error(err);
    process.exit(1);
  });
