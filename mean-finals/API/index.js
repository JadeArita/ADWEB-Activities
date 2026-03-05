const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_STRING = "mongodb://localhost:27017";
const DATABASENAME = "MyDb";
let database;

// Middleware: wait for DB connection
app.use((req, res, next) => {
  if (!database) {
    return res.status(503).json({ error: "Database not connected yet." });
  }
  next();
});

console.log("Starting Pet Adoption API...");
console.log("Connecting to MongoDB...");

async function start() {
  try {
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    database = client.db(DATABASENAME);
    console.log("Connected to MongoDB successfully!");

    app.listen(3000, () => {
      console.log("Pet Adoption API running on http://localhost:3000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();

// ─── GET ALL PETS ───────────────────────────────────────────────────────────
app.get("/pets", async (req, res) => {
  try {
    const result = await database.collection("pets").find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Failed to fetch pets" });
  }
});

// ─── GET SINGLE PET ─────────────────────────────────────────────────────────
app.get("/pets/:id", async (req, res) => {
  try {
    const pet = await database
      .collection("pets")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.json(pet);
  } catch (error) {
    console.error("Error fetching pet:", error);
    res.status(500).json({ error: "Failed to fetch pet" });
  }
});

// ─── ADD PET ─────────────────────────────────────────────────────────────────
app.post("/pets", multer().none(), async (req, res) => {
  try {
    const { name, breed, age, gender, vaccinated, adoptionStatus, description, imageUrl } = req.body;

    if (!name || !breed || !age || !gender) {
      return res.status(400).json({ error: "name, breed, age, and gender are required." });
    }

    const now = new Date();
    const newPet = {
      name,
      breed,
      age: Number(age),
      gender,
      vaccinated: vaccinated === "true" || vaccinated === true,
      adoptionStatus: adoptionStatus || "Available",
      description: description || "",
      imageUrl: imageUrl || "",
      createdAt: now,
      updatedAt: now,
    };

    const result = await database.collection("pets").insertOne(newPet);
    res.status(201).json({ message: "Pet added successfully!", id: result.insertedId });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ error: "Failed to add pet" });
  }
});

// ─── UPDATE PET ──────────────────────────────────────────────────────────────
app.put("/pets/:id", multer().none(), async (req, res) => {
  try {
    const { name, breed, age, gender, vaccinated, adoptionStatus, description, imageUrl } = req.body;

    if (!name || !breed || !age || !gender) {
      return res.status(400).json({ error: "name, breed, age, and gender are required." });
    }

    const updatedPet = {
      name,
      breed,
      age: Number(age),
      gender,
      vaccinated: vaccinated === "true" || vaccinated === true,
      adoptionStatus: adoptionStatus || "Available",
      description: description || "",
      imageUrl: imageUrl || "",
      updatedAt: new Date(),
    };

    const result = await database
      .collection("pets")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedPet });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json({ message: "Pet updated successfully!" });
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(500).json({ error: "Failed to update pet" });
  }
});

// ─── DELETE PET ──────────────────────────────────────────────────────────────
app.delete("/pets/:id", async (req, res) => {
  try {
    const result = await database
      .collection("pets")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json({ message: "Pet deleted successfully!" });
  } catch (error) {
    console.error("Error deleting pet:", error);
    res.status(500).json({ error: "Failed to delete pet" });
  }
});