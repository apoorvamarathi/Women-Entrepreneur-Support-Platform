const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    console.log('Incoming registration payload:', req.body);
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('Registration failed: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // If user is a mentor, create mentor profile
    if (user && role === 'mentor') {
      const Mentor = require('../models/Mentor');
      await Mentor.create({
        userId: user._id,
        industryExpertise: [],
        experience: 0,
        availability: true
      });
    }

    // If user is entrepreneur, create entrepreneur profile
    if (user && role === 'entrepreneur') {
      const EntrepreneurProfile = require('../models/EntrepreneurProfile');
      await EntrepreneurProfile.create({
        userId: user._id
      });
    }

    if (user) {
      console.log('Registration successful:', user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      console.log('Registration failed: Invalid user data created');
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error Details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log('Login attempt for:', email);

    const user = await User.findOne({ email });

    if (!user) {
        console.log('Login failed: User not found in database');
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    console.log(`Password match result for ${email}:`, isMatch);

    if (user && isMatch) {
      console.log('Login successful for:', email);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      console.log('Login failed: Password mismatch');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error Details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    // For security, don't reveal if email exists or not
    if (!user) {
      return res.status(200).json({ message: 'If an account with this email exists, a reset link has been sent.' });
    }

    // In a real app, you would generate a reset token and send an email
    // For now, we'll just return a success message
    console.log(`Password reset requested for: ${email}`);

    res.status(200).json({ 
      message: 'If an account with this email exists, a reset link has been sent.' 
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};
