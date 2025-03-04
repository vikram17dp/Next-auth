import mongoose from "mongoose"

let isConnected = false

export const connect = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected")
    return
  }

  try {
    const MONGODB_URI = process.env.MONGO_URI

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables")
    }

    console.log("Attempting to connect to MongoDB...")
    await mongoose.connect(MONGODB_URI)

    isConnected = true
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    throw error 
  }
}

