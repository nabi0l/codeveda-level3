import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedPost from '../components/FeaturedPost';
import LatestCarousel from '../components/LatestCarousel';
import TimelineList from '../components/TimelineList';
import postsApi from '../api/posts';
import { STUDIO_CATEGORIES } from '../utils/categories';
import './HomePage.css';

const HomePage = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [olderPosts, setOlderPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        const allPostsData = await postsApi.getAllPosts();
        const postsArray = Array.isArray(allPostsData) ? allPostsData : [];
        
        if (postsArray.length > 0) {
          let featured = postsArray.find(p => p.featured);
          if (!featured) featured = postsArray[0];

          setFeaturedPost(featured);

          const remainingAfterFeatured = postsArray.filter(p => p._id !== featured._id);
          const latest = remainingAfterFeatured.slice(0, 5);
          setLatestPosts(latest);

          const latestIds = latest.map(l => l._id);
          const older = remainingAfterFeatured.filter(p => !latestIds.includes(p._id));
          setOlderPosts(older.length > 0 ? older : remainingAfterFeatured.slice(2));
        }

        setError(null);
      } catch (err) {
        setError('Failed to load posts. Please verify server connection.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="home-page container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading studio dispatches from the workbench...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="container">
        <nav className="magazine-category-bar">
          <span className="category-bar-label">TOPICS</span>
          <div className="category-pills-scroll">
            <Link to="/articles" className="category-pill active">
              All Topics <span className="pill-count">10</span>
            </Link>
            {STUDIO_CATEGORIES.map(cat => (
              <Link key={cat.slug} to={`/blog/${cat.slug}`} className={`category-pill pill-${cat.slug}`}>
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        {featuredPost && <FeaturedPost post={featuredPost} />}

        {latestPosts.length > 0 && <LatestCarousel posts={latestPosts} />}

        <section className="magazine-quote-banner">
          <div className="quote-watermark">“</div>
          <blockquote className="editorial-quote">
            “Design isn’t just how something looks or feels. It’s how thoughtfully it lives in the messy, distracted hands of a real human being.”
          </blockquote>
          <cite className="quote-author">— Atelier Studio Manifesto, Note Nº 07</cite>
        </section>

        {olderPosts.length > 0 && <TimelineList posts={olderPosts} />}

        <section className="magazine-newsletter-card">
          <div className="newsletter-content">
            <span className="section-label">THE STUDIO DISPATCH</span>
            <h2>Raw Studio Notes & Craft Reflections, Every Fortnight</h2>
            <p>No marketing fluff, no buzzwords. Just honest case retrospectives, typography experiments, and lessons from our studio bench.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for joining the Studio Dispatch!'); }} className="newsletter-form">
            <input type="email" placeholder="Enter your email address..." required className="newsletter-input" />
            <button type="submit" className="btn btn-primary">Join Dispatch</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HomePage;