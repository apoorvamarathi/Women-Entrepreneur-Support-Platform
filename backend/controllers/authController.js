const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendEmail } = require('../utils/emailService');

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
      
      // Send Welcome Email
      await sendEmail({
        to: user.email,
        subject: `Welcome to Women Entrepreneur Platform, ${user.name}!`,
        html: `<h2>Welcome aboard, ${user.name}!</h2>
               <p>We are thrilled to have you join our community as a <strong>${user.role}</strong>.</p>
               <p>Please log in to your dashboard to complete your profile and start exploring opportunities.</p>`
      });

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

    if (!user) {
      return res.status(200).json({ message: 'If an account with this email exists, a reset link has been sent.' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // IMPORTANT: Force log the reset URL to the terminal so the developer can test it
    // without actually waiting for the real SMTP email to arrive at a fake test email!
    console.log(`\n\n========================================`);
    console.log(` 🔐 MAGIC PASSWORD RESET LINK FOR ${user.email} `);
    console.log(` ${resetUrl} `);
    console.log(`========================================\n\n`);

    const message = `
      <h2>Password Reset Request</h2>
      <p>You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n <a href="${resetUrl}">${resetUrl}</a></p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        html: message,
      });

      res.status(200).json({ message: 'If an account with this email exists, a reset link has been sent.' });
    } catch (error) {
      console.error('Email sending failed', error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: 'Email could not be sent' });
    }

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const crypto = require('crypto');
    
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({ message: 'Please provide a valid password of at least 6 characters.' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password successfully reset',
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
