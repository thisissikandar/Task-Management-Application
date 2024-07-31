import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

export async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
    process.exit(1);
  }
}
