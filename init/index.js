import mongoose from "mongoose";
import { Listing } from "../src/models/listing.model.js";
import { sampleListings } from "./data.js";

import "dotenv/config.js";

const dbUrl = "mongodb+srv://parkash:0235%40@clusterairbnb.55xrfpc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAirbnb";
console.log(dbUrl)

async function seedDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Database connected");

    // Clear old data
    await Listing.deleteMany({});
    console.log("🗑️ Old listings removed");

    // Insert new data
    await Listing.insertMany(sampleListings);
    console.log("🌱 Sample listings added successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
}

seedDB();
