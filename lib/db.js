import mongoose from "mongoose";
const { NAME, PASSWORD, DB_NAME, CLUSTER } = process.env;
// const Uri="mongodb+srv://developers082025:Developer%40%23%23082025@cluster0.skp9z89.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Cluster0"
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "NotesApp";

export default async function connecting() {
  if (mongoose.connection.readyState === 1) {
    console.log("#  -- Already connected to database  --#");
    return;
  }
  try {
    if (!uri) throw new Error("MONGODB_URI is not set");
    await mongoose.connect(uri, { dbName });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
