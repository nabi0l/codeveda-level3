require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/design-journal';

// Friendly reminder: Run this script anytime to verify or provision the default admin account
const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ MongoDB connected successfully');

    const existingAdmin = await User.findOne({ email: 'admin@designjournal.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log({
        username: existingAdmin.username,
        email: existingAdmin.email,
        role: existingAdmin.role
      });
      
      console.log('\nTo reset the admin password, you can use the update-password endpoint after logging in.');
      process.exit(0);
    }

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@designjournal.com',
      password: 'Admin123!',
      role: 'admin'
    });

    console.log('✓ Admin user created successfully:');
    console.log({
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role
    });
    console.log('\nYou can now login with:');
    console.log('Email: admin@designjournal.com');
    console.log('Password: Admin123!');
    console.log('\n⚠️  Please change this password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin();