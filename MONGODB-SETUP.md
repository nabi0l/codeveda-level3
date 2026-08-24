# MongoDB Setup Guide 🍃

You need MongoDB running to use this app. Here are your options:

## Option 1: MongoDB Atlas (Cloud - EASIEST) ⭐

**Steps:**

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free (no credit card needed)

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Select "FREE" tier (M0)
   - Choose a cloud provider and region (pick one close to you)
   - Click "Create Cluster" (takes 1-3 minutes)

3. **Create a Database User**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `bloguser` (or whatever you want)
   - Password: Click "Autogenerate" and COPY IT
   - User Privileges: Choose "Read and write to any database"
   - Click "Add User"

4. **Allow Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in left menu
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like this):
   ```
   mongodb+srv://bloguser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Update Your .env File**
   - Open `server/.env`
   - Replace the MONGODB_URI line with your connection string
   - Replace `<password>` with the password you copied earlier
   - Add `/design-journal` before the `?` like this:
   ```
   MONGODB_URI=mongodb+srv://bloguser:YourPassword123@cluster0.xxxxx.mongodb.net/design-journal?retryWrites=true&w=majority
   ```

7. **Test It!**
   ```powershell
   cd server
   npm run seed
   ```

You should see: `✓ Connected to MongoDB` and `✓ Inserted 8 sample posts`

---

## Option 2: Install MongoDB Locally

**Steps:**

1. **Download MongoDB**
   - Visit: https://www.mongodb.com/try/download/community
   - Download the Windows installer (.msi file)
   - Version: 7.0 or latest

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Select "Run service as Network Service user"
   - Install MongoDB Compass (GUI tool) - check this box
   - Complete the installation

3. **Verify Installation**
   ```powershell
   mongod --version
   ```
   You should see MongoDB version info

4. **MongoDB Should Start Automatically**
   - Check if it's running:
   ```powershell
   Get-Service MongoDB
   ```
   - Status should be "Running"

5. **Update .env (Already Set)**
   Your `.env` should have:
   ```
   MONGODB_URI=mongodb://localhost:27017/design-journal
   ```

6. **Test It!**
   ```powershell
   cd server
   npm run seed
   ```

---

## Quick Troubleshooting

**"Connection refused" error?**
- Option 1 (Atlas): Check your connection string in `.env`
- Option 2 (Local): MongoDB service isn't running

**"Authentication failed" with Atlas?**
- Check your username and password in the connection string
- Make sure you replaced `<password>` with actual password

**"IP not whitelisted" with Atlas?**
- Go to Network Access → Add IP Address → Allow Access from Anywhere

**Still stuck?**
- Try Atlas first - it's easier and no installation needed
- Make sure you copied the FULL connection string
- Check there are no extra spaces in your `.env` file

---

## Which Should I Choose?

**Use Atlas if:**
- ✅ You want the quickest setup
- ✅ You don't want to install anything
- ✅ You're deploying to production later

**Use Local MongoDB if:**
- ✅ You want to learn MongoDB installation
- ✅ You prefer working offline
- ✅ You're comfortable with system services

**My Recommendation:** Start with Atlas! You can always switch to local later.

---

Need help? Re-read this guide or check the error messages carefully!
