require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import your Mongoose models
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const EntrepreneurProfile = require('../models/EntrepreneurProfile');
const TrainingProgram = require('../models/TrainingProgram');
const Resource = require('../models/Resource');
const MentorshipRequest = require('../models/MentorshipRequest');

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("Connected! Wiping existing collections...");
    
    // Clear out existing data
    await User.deleteMany();
    await Mentor.deleteMany();
    await EntrepreneurProfile.deleteMany();
    await TrainingProgram.deleteMany();
    await Resource.deleteMany();
    await MentorshipRequest.deleteMany();

    const mockPassword = 'password123';

    console.log("Inserting Dummy Users...");

    // 1. Admin
    const admin = await User.create({
      name: "Platform Admin",
      email: "admin@weplatform.com",
      password: mockPassword,
      role: "admin",
      status: "active"
    });

    // 2. Mentors
    const mentor1 = await User.create({
      name: "Sarah Jenkins",
      email: "sarah.tech@weplatform.com",
      password: mockPassword,
      role: "mentor",
      status: "active"
    });
    await Mentor.create({
      userId: mentor1._id,
      industryExpertise: ["tech", "finance"],
      experience: 10,
      availability: true,
      location: "San Francisco, CA",
      preferredStages: ["startup", "growth"]
    });

    const mentor2 = await User.create({
      name: "Elena Rodriguez",
      email: "elena.retail@weplatform.com",
      password: mockPassword,
      role: "mentor",
      status: "active"
    });
    await Mentor.create({
      userId: mentor2._id,
      industryExpertise: ["retail", "marketing"],
      experience: 15,
      availability: true,
      location: "New York, NY",
      preferredStages: ["idea", "startup"]
    });

    // 3. Entrepreneurs
    const ent1 = await User.create({
      name: "Maya Patel",
      email: "maya@founder.com",
      password: mockPassword,
      role: "entrepreneur",
      status: "active"
    });
    await EntrepreneurProfile.create({
      userId: ent1._id,
      businessName: "EcoTech Deliveries",
      industry: "tech",
      stage: "startup",
      fundingRequired: 50000,
      location: "San Francisco, CA",
      description: "A green delivery logistics platform prioritizing an all-EV fleet.",
      website: "https://ecotech.example.com"
    });

    const ent2 = await User.create({
      name: "Olivia Chen",
      email: "olivia@founder.com",
      password: mockPassword,
      role: "entrepreneur",
      status: "active"
    });
    await EntrepreneurProfile.create({
      userId: ent2._id,
      businessName: "Artisan Crafts Co.",
      industry: "retail",
      stage: "growth",
      fundingRequired: 20000,
      location: "Portland, OR",
      description: "Connecting local craftswomen directly to national buyers.",
      website: "https://artisancrafts.example.com"
    });

    console.log("Inserting Dummy Training Programs...");
    await TrainingProgram.insertMany([
      {
        title: "Tech Startup Resiliency 101",
        description: "Learn how to survive the first 18 months of a technology startup, from MVP to Series A.",
        trainer: "Sarah Jenkins",
        duration: "4 Weeks",
        schedule: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next week
      },
      {
        title: "Retail Profit Margins Masterclass",
        description: "Understand the math of retail markups, supplier negotiations, and holiday scaling.",
        trainer: "Elena Rodriguez",
        duration: "2 Weeks",
        schedule: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    ]);

    console.log("Inserting Dummy Resources...");
    await Resource.insertMany([
      {
        title: "AWS Activate Founders Pitch Deck Template",
        description: "The official tech pitch deck template designed to secure your first seed round.",
        link: "https://example.com/tech-pitch-deck",
        category: "templates",
        type: "download"
      },
      {
        title: "Wholesale vs Dropshipping Comparison",
        description: "A deep dive guide into retail supply chains to maximize your product margins.",
        link: "https://example.com/retail-supply-chain",
        category: "guides",
        type: "view"
      }
    ]);

    console.log("✅ Database Seeded Successfully!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();
