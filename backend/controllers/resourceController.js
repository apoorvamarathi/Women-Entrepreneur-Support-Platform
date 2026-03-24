const Resource = require('../models/Resource');

// Initial seed data based on the frontend's hardcoded mock
const initialSeed = [
  { title: "How to Start a Business", description: "Step-by-step guide for launching your startup.", category: "guides", type: "view", link: "/resources/start-business-guide" },
  { title: "Marketing 101", description: "Essential marketing strategies for small businesses.", category: "guides", type: "view", link: "/resources/marketing-101" },
  { title: "Legal Basics for Entrepreneurs", description: "Understand contracts, licenses, and compliance.", category: "guides", type: "view", link: "/resources/legal-basics" },
  { title: "Business Plan Template", description: "Editable template to create your business plan.", category: "templates", type: "download", fileUrl: "/templates/business-plan-template.docx" },
  { title: "Financial Projection Spreadsheet", description: "Excel sheet for revenue and expense forecasting.", category: "templates", type: "download", fileUrl: "/templates/financial-projections.xlsx" },
  { title: "Pitch Deck Outline", description: "Structure your investor presentation.", category: "templates", type: "download", fileUrl: "/templates/pitch-deck-outline.pptx" },
  { title: "Pitching to Investors", description: "Learn how to deliver a winning pitch.", category: "videos", type: "view", link: "/videos/pitch-training" },
  { title: "Financial Projections Basics", description: "Understand key financial metrics.", category: "videos", type: "view", link: "/videos/financial-basics" },
  { title: "Building Your Team", description: "Hiring and culture for startups.", category: "videos", type: "view", link: "/videos/building-team" },
  { title: "Women Entrepreneurship Scheme", description: "Funding and support for women-led businesses.", category: "schemes", type: "view", link: "/schemes/women-entrepreneurship" },
  { title: "Startup India", description: "Benefits and registration process.", category: "schemes", type: "view", link: "/schemes/startup-india" },
  { title: "MSME Loans", description: "Government-backed loans for small businesses.", category: "schemes", type: "view", link: "/schemes/msme-loans" }
];

// @desc    Get all learning resources
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res) => {
  try {
    let resources = await Resource.find().sort('-createdAt');
    
    // Auto-seed if empty (for demonstration purposes so UI naturally populates like the mock)
    if (resources.length === 0) {
      resources = await Resource.insertMany(initialSeed);
    }

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new learning resource
// @route   POST /api/resources
// @access  Admin
const createResource = async (req, res) => {
  try {
    const { title, description, category, type, link, fileUrl } = req.body;

    if (!title || !description || !category || !type) {
      return res.status(400).json({ message: 'Title, description, category, and type are required' });
    }

    // Only Admins (or maybe Mentors) should upload, but we'll loosely check if not entrepreneur for now.
    // In a stricter system, protect routes via middleware.
    if (req.user.role === 'entrepreneur') {
      return res.status(403).json({ message: 'Only admins and mentors can upload resources' });
    }

    const resource = await Resource.create({
      title,
      description,
      category,
      type,
      link,
      fileUrl,
      createdBy: req.user.id
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getResources,
  createResource
};
