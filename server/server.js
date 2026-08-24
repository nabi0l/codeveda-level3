const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Design Journal API is running',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate value entered for a unique field'
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/design-journal';
const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/design-journal';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB Atlas connected successfully');
    startServer();
  })
  .catch((atlasError) => {
    console.warn('⚠ MongoDB Atlas connection failed, trying local MongoDB...');
    console.warn('   Atlas error:', atlasError.message);
    
    // Friendly reminder: Gracefully fall back to local MongoDB if cloud instance is unreachable
    mongoose.connect(LOCAL_MONGODB_URI)
      .then(() => {
        console.log('✓ Local MongoDB connected successfully');
        startServer();
      })
      .catch((localError) => {
        console.error('✗ Local MongoDB connection error:', localError.message);
        console.error('   Make sure MongoDB is running locally or update your IP whitelist in MongoDB Atlas');
        process.exit(1);
      });
  });

function startServer() {
  app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ API available at http://localhost:${PORT}/api`);
  });
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});
