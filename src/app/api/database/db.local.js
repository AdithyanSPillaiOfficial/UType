const fs = require('fs');
const path = require('path');

// Define the path to the database file
const dbFilePath = path.join(__dirname, 'db.json');
//const dbFilePath = path.join('/.next/server/app/api/database/db.json');

// Helper function to read the database file
const readDatabase = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If the file doesn't exist or is empty, return an empty array
        return [];
    }
};

// Helper function to write to the database file
const writeDatabase = (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Function to add a new object to the database
const addObject = (newObject) => {
    const db = readDatabase();
    db.push(newObject);
    writeDatabase(db);
    console.log('Object added successfully!');
    return true
};

// Function to fetch objects based on parameters
const fetchObjectsByParam = (paramKey, paramValue) => {
    const db = readDatabase();
    const filteredObjects = db.filter((obj) => obj[paramKey] === paramValue);
    return filteredObjects;
};


// Function to get all objects from the database
const getAllObjects = () => {
    return readDatabase();
};

// Export the functions for external usage
module.exports = { addObject, fetchObjectsByParam, getAllObjects };
