# Design Journal 📝✨

Hey there! Welcome to Design Journal - a beautiful blog platform where design enthusiasts can share their thoughts, insights, and experiences. Think of it as your personal corner of the internet to talk about everything design-related.

## What's This About?

Design Journal is a full-stack blog application that makes writing and reading about design topics fun and engaging. Whether you want to share a tutorial, document a case study, or just jot down some quick notes, this is the place to do it.

The cool part? It's not just another boring blog. I've mixed different viewing styles to make reading more interesting - from big magazine-style featured posts to a timeline view that lets you travel back through your content.

## What Can You Do?

- **Write & Share** - Create posts with images, organize them by category, and make your favorites stand out
- **Beautiful Reading** - Posts are displayed in multiple ways: magazine layouts, timelines, clean reading lists, and even a carousel for the latest stuff
- **Stay Organized** - Everything's sorted into categories like UI Design, UX Research, Case Studies, Tutorials, and Notes
- **Easy Management** - Simple admin panel to create, edit, or delete posts whenever you want
- **Browse Your Way** - Filter by category, check out featured posts, or just scroll through everything

## Getting Started

### What You'll Need

Just two things:
- **Node.js** (version 16 or newer) - [Grab it here](https://nodejs.org/)
- **MongoDB** - You have two options:
  - **MongoDB Atlas** (Cloud - Recommended) - [Sign up free](https://www.mongodb.com/cloud/atlas)
  - **MongoDB Community** (Local) - [Download here](https://www.mongodb.com/try/download/community)

> **New to MongoDB?** Check `MONGODB-SETUP.md` for detailed setup instructions!

### Setting Things Up

**1. Install the backend stuff:**
```powershell
cd server
npm install
```

**2. Set up your database connection:**

**Option A: MongoDB Atlas (Cloud - Easier)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database user
3. Get your connection string
4. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/design-journal?retryWrites=true&w=majority
   ```

**Option B: Local MongoDB**
- Install MongoDB locally
- The `.env` file is already configured:
  ```env
  MONGODB_URI=mongodb://localhost:27017/design-journal
  ```

> **Need help?** See `MONGODB-SETUP.md` for step-by-step instructions!

**3. Add some sample posts:**
```powershell
npm run seed
```

This creates 8 sample blog posts so you can see how everything works right away.

**4. Start the backend:**
```powershell
npm run dev
```

You should see: `✓ Connected to MongoDB` and `✓ Server running on port 5000`

**5. Install the frontend (open a new terminal):**
```powershell
cd client
npm install
```

**6. Start the frontend:**
```powershell
npm run dev
```

**7. Open your browser:**

Go to `http://localhost:5173` and boom! You're in.

## Taking It for a Spin

### First Time Here?

When you open the app, you'll land on the home page where you'll see:
- A big featured post right at the top
- A carousel showing the latest posts (use the arrows to browse)
- A timeline of older posts as you scroll down
- Navigation to all the different categories

### Want to Create Your First Post?

1. Click "Admin" in the navigation
2. Hit the "New Post" button
3. Fill in:
   - **Title** - What's your post about?
   - **Slug** - Auto-generated, but you can tweak it
   - **Excerpt** - A quick summary
   - **Content** - Your full article
   - **Cover Image** - Drop in an image URL (try [Unsplash](https://unsplash.com) for free images)
   - **Category** - Pick what fits
   - **Tags** - Add some keywords (comma-separated)
   - **Featured** - Check this if you want it highlighted on the home page
4. Click "Create Post"
5. Head back to the home page to see it live!

### Exploring Different Views

- **Home** (`/`) - The main page with everything mixed together
- **Categories** (`/blog/ui-design`, etc.) - See posts filtered by topic
- **All Articles** (`/articles`) - A clean, simple list of everything
- **Post Detail** - Click any post to read the full thing with related posts at the bottom
- **Admin** (`/admin/posts`) - Your control center for managing content

## How It's Built

**Backend:**
- Node.js + Express for the server
- MongoDB for storing everything
- Mongoose for working with the database
- REST API for all the operations

**Frontend:**
- React for the interface
- React Router for navigation
- Axios for talking to the backend
- Vite for super-fast development

## The API (If You're Curious)

The backend provides these endpoints:

- `GET /api/posts` - Get all posts (supports filtering by category, featured status, and limiting results)
- `GET /api/posts/:slug` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

Want to test it? Try: `curl http://localhost:5000/api/posts`

## Project Structure

```
design-journal/
├── server/              # Backend
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── scripts/         # Utility scripts (like seeding)
│   └── server.js        # Main server file
│
├── client/              # Frontend
│   └── src/
│       ├── api/         # API communication
│       ├── components/  # Reusable UI pieces
│       ├── pages/       # Different pages
│       ├── App.jsx      # Main app component
│       └── index.css    # Global styles
```

## Common Issues & Quick Fixes

**"Connection refused" error?**
- MongoDB isn't running or not installed
- **Solution**: Follow the `MONGODB-SETUP.md` guide to set up MongoDB Atlas (easiest)

**Backend won't start?**
- Make sure MongoDB is accessible (check your connection string)
- Check `server/.env` has the correct MONGODB_URI

**"Authentication failed" with Atlas?**
- Check your username and password in the connection string
- Make sure you replaced `<password>` with your actual password

**Port already in use?**
- Close other apps using port 5000 or 5173
- Or change the port in `.env` files

**Don't see any posts?**
- Run `npm run seed` in the server folder

**Frontend not loading?**
- Make sure the backend is running first
- Check that `client/.env` has the right API URL

**Getting CORS errors?**
- Restart both servers
- Clear your browser cache

## Want to Deploy This?

**Backend** (Railway, Render, or Heroku):
- Set up your environment variables
- Point to a production MongoDB database
- Deploy the `server` folder

**Frontend** (Vercel or Netlify):
- Update `VITE_API_URL` to your deployed backend URL
- Run `npm run build`
- Deploy the `dist` folder

## A Few Notes

This project was built as part of the Codveda Full-Stack Development Internship Program. It demonstrates complete CRUD operations, REST API design, modern React patterns, and how to create an engaging user experience with multiple UI layouts.

Feel free to customize it, break it, improve it - that's how we learn! 🚀

## Need Help?

Stuck on something? Here's what to check:
1. Are both servers running?
2. Is MongoDB connected?
3. Check the terminal for error messages
4. Look at the browser console (F12) for frontend errors
5. Try restarting everything

## License

MIT License - Use it however you'd like for learning and building cool stuff!

---

**Built with ❤️ for designers, developers, and everyone in between.**

Happy blogging! ✨
