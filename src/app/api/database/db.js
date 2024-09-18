const { MongoClient } = require('mongodb');
require('dotenv').config();


// Connection URL and Database Name
const username = encodeURIComponent(process.env.DB_UNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@cluster0.kf2qhwd.mongodb.net/?retryWrites=true&w=majority`; // Update with your MongoDB URI if hosted remotely
const dbName = 'utype'; // Update with your desired database name
const collectionName = 'leaderboard'; // Update with your desired collection name

// Initialize MongoDB client
const client = new MongoClient(uri);

let db; // This will hold the connection to the database

// Helper function to connect to the database
const connectToDatabase = async () => {
    try {
        if (!db) {
            await client.connect();
            db = client.db(dbName);
            console.log('Connected to database successfully');
        }
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

// Function to add a new object to the MongoDB collection
const addObject = async (newObject) => {
    try {
        await connectToDatabase();
        const collection = db.collection(collectionName);
        await collection.insertOne(newObject);
        console.log('Object added successfully!');
        return true;
    } catch (err) {
        console.error('Failed to add object:', err);
        return false;
    }
};

// Function to fetch objects based on parameters
const fetchObjectsByParam = async (paramKey, paramValue) => {
    try {
        await connectToDatabase();
        const collection = db.collection(collectionName);
        const filteredObjects = await collection.find({ [paramKey]: paramValue }).toArray();
        return filteredObjects;
    } catch (err) {
        console.error('Failed to fetch objects:', err);
        return [];
    }
};

// Function to get all objects from the MongoDB collection
const getAllObjects = async () => {
    try {
        await connectToDatabase();
        const collection = db.collection(collectionName);
        const allObjects = await collection.find({}).toArray();
        return allObjects;
    } catch (err) {
        console.error('Failed to get objects:', err);
        return [];
    }
};

// Export the functions for external usage
module.exports = { addObject, fetchObjectsByParam, getAllObjects };
