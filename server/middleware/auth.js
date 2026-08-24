const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Friendly reminder: Verifies JWT token and attaches active user instance to the request
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route. No token provided.'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found with this token.'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'User account has been deactivated.'
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: 'Token is invalid or expired.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error during authentication.'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized to access this route.`
      });
    }
    next();
  };
};

exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (jwtError) {
        console.log('Optional auth token invalid:', jwtError.message);
      }
    }

    next();
  } catch (error) {
    next();
  }
};