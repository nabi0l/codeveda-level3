/**
 * Shared helper utilities for the Design Journal server
 */

/**
 * Create standardized user response object
 * @param {Object} user - User document from database
 * @returns {Object} Sanitized user response object
 */
exports.createUserResponse = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
};

/**
 * Create standardized error response
 * @param {Object} res - Express response object
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 */
exports.sendErrorResponse = (res, status, message) => {
  return res.status(status).json({
    success: false,
    error: message
  });
};

/**
 * Create standardized success response
 * @param {Object} res - Express response object
 * @param {number} status - HTTP status code
 * @param {Object} data - Response data
 */
exports.sendSuccessResponse = (res, status, data) => {
  return res.status(status).json({
    success: true,
    ...data
  });
};