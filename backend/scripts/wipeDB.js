require('dotenv').config();
const mongoose = require('mongoose');

const wipeDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Connected! Fetching collections...");
        const collections = await mongoose.connection.db.collections();
        
        for (let collection of collections) {
            await collection.drop();
            console.log(`🗑️ Dropped collection: ${collection.collectionName}`);
        }
        
        console.log("✅ Successfully wiped ALL data from MongoDB!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error wiping database:", error);
        process.exit(1);
    }
};

wipeDB();
