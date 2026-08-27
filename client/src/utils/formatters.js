/**
 * Shared formatting and helper utilities for the Design Journal client
 */

export const IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop';

/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Date formatting options (optional)
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Convert category name to CSS class name
 * @param {string} category - Category name
 * @returns {string} CSS-safe class name
 */
export const getCategoryClass = (category) => {
  return (category || '').toLowerCase().replace(/\s+/g, '-');
};

/**
 * Calculate estimated reading time for content
 * @param {string} content - Post content
 * @returns {number} Estimated reading time in minutes
 */
export const calculateReadingTime = (content) => {
  if (!content) return 3;
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

/**
 * Convert title to URL-safe slug
 * @param {string} title
 * @returns {string} URL slug
 */
export const generateSlug = (title) => {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Extract clean error message from Axios error response or error object
 * @param {Error|Object} error
 * @param {string} defaultMessage
 * @returns {string}
 */
export const getErrorMessage = (error, defaultMessage = 'An unexpected error occurred. Please try again.') => {
  return error?.response?.data?.error || error?.response?.data?.message || error?.message || defaultMessage;
};

/**
 * Generate fallback avatar URL with initials
 * @param {string} name
 * @returns {string}
 */
export const getFallbackAvatar = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Author')}&background=18181b&color=c2785c&bold=true&size=140`;
};