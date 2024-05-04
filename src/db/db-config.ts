import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (error) => {
      console.log("Error connecting to MongoDB:---", error);
    });
  } catch (error) {
    console.log("Error connecting to database:---", error);
  }
}
