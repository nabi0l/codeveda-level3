const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const { protect } = require('../middleware/auth');
const { createUserResponse, sendErrorResponse, sendSuccessResponse } = require('../utils/helpers');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return sendErrorResponse(res, 400, 'Please provide username, email, and password');
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return sendErrorResponse(res, 400, 'Email already registered');
      }
      if (existingUser.username === username) {
        return sendErrorResponse(res, 400, 'Username already taken');
      }
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user'
    });

    const token = generateToken(user._id);
    const userResponse = createUserResponse(user);

    sendSuccessResponse(res, 201, {
      message: 'User registered successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return sendErrorResponse(res, 400, errors.join(', '));
    }

    sendErrorResponse(res, 500, 'Server error during registration');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(res, 400, 'Please provide email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return sendErrorResponse(res, 401, 'Invalid credentials');
    }

    if (!user.isActive) {
      return sendErrorResponse(res, 401, 'Account has been deactivated');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, 'Invalid credentials');
    }

    const token = generateToken(user._id);
    const userResponse = createUserResponse(user);

    sendSuccessResponse(res, 200, {
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    sendErrorResponse(res, 500, 'Server error during login');
  }
});

// Friendly reminder: In stateless JWT, client deletes token to logout
router.post('/logout', protect, (req, res) => {
  sendSuccessResponse(res, 200, {
    message: 'Logout successful'
  });
});

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    const userResponse = {
      ...createUserResponse(user),
      isActive: user.isActive
    };

    sendSuccessResponse(res, 200, { user: userResponse });
  } catch (error) {
    console.error('Get user error:', error);
    sendErrorResponse(res, 500, 'Server error while fetching user data');
  }
});

router.put('/update-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendErrorResponse(res, 400, 'Please provide current and new password');
    }

    if (newPassword.length < 6) {
      return sendErrorResponse(res, 400, 'New password must be at least 6 characters');
    }

    const user = await User.findById(req.user.id).select('+password');

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, 'Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);

    sendSuccessResponse(res, 200, {
      message: 'Password updated successfully',
      token
    });
  } catch (error) {
    console.error('Update password error:', error);
    sendErrorResponse(res, 500, 'Server error while updating password');
  }
});

module.exports = router;