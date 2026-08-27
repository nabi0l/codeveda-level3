const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect, authorize } = require('../middleware/auth');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(async (req, res) => {
  const { category, featured, limit, sort } = req.query;
  
  let query = {};
  
  if (category) {
    query.category = category;
  }
  
  if (featured !== undefined) {
    query.featured = featured === 'true';
  }
  
  let postsQuery = Post.find(query);
  
  const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  postsQuery = postsQuery.sort(sortOption);
  
  if (limit) {
    postsQuery = postsQuery.limit(parseInt(limit));
  }
  
  const posts = await postsQuery.populate('author', 'username email');
  
  res.json({
    success: true,
    posts
  });
}));

router.get('/id/:id', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username email');
  
  if (!post) {
    return res.status(404).json({ 
      success: false, 
      message: 'Post not found' 
    });
  }
  
  res.json({
    success: true,
    post
  });
}));

router.get('/:slug', asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'username email');
  
  if (!post) {
    return res.status(404).json({ 
      success: false,
      message: 'Post not found' 
    });
  }
  
  res.json({
    success: true,
    post
  });
}));

router.post('/', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const { title, slug, excerpt, content, coverImage, category, tags, featured } = req.body;
  
  if (!title || !slug || !content || !category) {
    return res.status(400).json({ 
      success: false,
      message: 'Title, slug, content, and category are required' 
    });
  }
  
  const existingPost = await Post.findOne({ slug });
  if (existingPost) {
    return res.status(400).json({ 
      success: false,
      message: 'Slug already exists' 
    });
  }
  
  const post = await Post.create({
    title,
    slug,
    excerpt,
    content,
    coverImage: coverImage || '',
    category,
    tags: tags || [],
    featured: featured || false,
    author: req.user.id
  });

  await post.populate('author', 'username email');
  
  res.status(201).json({
    success: true,
    post
  });
}));

router.put('/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const { title, slug, excerpt, content, coverImage, category, tags, featured } = req.body;
  
  let post = await Post.findById(req.params.id);
  
  if (!post) {
    return res.status(404).json({ 
      success: false,
      message: 'Post not found' 
    });
  }
  
  if (slug && slug !== post.slug) {
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ 
        success: false,
        message: 'Slug already exists' 
      });
    }
  }
  
  post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: title || post.title,
      slug: slug || post.slug,
      excerpt: excerpt || post.excerpt,
      content: content || post.content,
      coverImage: coverImage !== undefined ? coverImage : post.coverImage,
      category: category || post.category,
      tags: tags || post.tags,
      featured: featured !== undefined ? featured : post.featured
    },
    {
      new: true,
      runValidators: true
    }
  );
  
  res.json({
    success: true,
    post
  });
}));

router.delete('/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return res.status(404).json({ 
      success: false,
      message: 'Post not found' 
    });
  }
  
  await Post.findByIdAndDelete(req.params.id);
  
  res.json({ 
    success: true, 
    message: 'Post deleted successfully' 
  });
}));

module.exports = router;
