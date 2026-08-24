import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FeaturedPost from '../components/FeaturedPost';
import TimelineList from '../components/TimelineList';
import postsApi from '../api/posts';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryMap = {
    'ui-design': 'UI Design',
    'ux-research': 'UX Research',
    'case-study': 'Case Study',
    'tutorial': 'Tutorial',
    'notes': 'Notes'
  };

  const categoryName = categoryMap[category] || category;

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);
        
        const categoryPosts = await postsApi.getAllPosts({ category: categoryName });
        const categoryArray = Array.isArray(categoryPosts) ? categoryPosts : [];
        setPosts(categoryArray);
        
        const featured = categoryArray.find(post => post.featured);
        setFeaturedPost(featured || null);
        
        setError(null);
      } catch (err) {
        setError('Failed to load posts for this category. Please try again later.');
        console.error('Error fetching category posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryPosts();
    }
  }, [categoryName]);

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading {categoryName} dispatches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-page">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const postsForTimeline = featuredPost 
    ? posts.filter(post => post._id !== featuredPost._id)
    : posts;

  return (
    <div className="category-page">
      <div className="category-container">
        <div className="category-header">
          <h1 className="category-title">{categoryName}</h1>
          <p className="category-description">
            Candid essays, field notes, and reflections on {categoryName.toLowerCase()} from our studio workbench.
          </p>
        </div>

        {featuredPost && <FeaturedPost post={featuredPost} />}

        {postsForTimeline.length > 0 ? (
          <TimelineList posts={postsForTimeline} />
        ) : (
          <div className="no-posts">
            <p>No dispatches filed under {categoryName} yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;