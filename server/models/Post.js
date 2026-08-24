const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['UI Design', 'UX Research', 'Case Study', 'Tutorial', 'Notes']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Friendly reminder: Compound & single-field indexes optimize topic filtering and sorting
postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ category: 1 });
postSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);