import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReaderList from '../components/ReaderList';
import postsApi from '../api/posts';
import './AllArticlesPage.css';

const categories = ['All', 'UI Design', 'UX Research', 'Case Study', 'Tutorial', 'Notes'];

const AllArticlesPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const allPostsData = await postsApi.getAllPosts();
        const postsArray = Array.isArray(allPostsData) ? allPostsData : [];
        setPosts(postsArray);
        setError(null);
      } catch (err) {
        setError('Failed to load articles. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    let result = posts;

    if (selectedCategory !== 'All') {
      result = result.filter(p => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        (p.title || '').toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    setFilteredPosts(result);
  }, [posts, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="all-articles-page container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading studio archive index...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-articles-page container">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-articles-page">
      <div className="container container-narrow">
        <header className="articles-page-header">
          <span className="section-label">THE COMPLETE ARCHIVE</span>
          <h1 className="articles-title">The Reading Desk</h1>
          <p className="articles-subtitle">
            A quiet, typography-focused catalogue of every essay, case study, and craft note from our studio bench.
          </p>

          <div className="articles-filter-box">
            <div className="filter-search-input-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="search-icon">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                type="text"
                placeholder="Search dispatches by title, keyword, or craft tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>Clear</button>
              )}
            </div>

            <div className="filter-category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="articles-results-meta">
            Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'dispatch' : 'dispatches'}
            {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
            {searchQuery && <span> matching <em>"{searchQuery}"</em></span>}
          </div>
        </header>

        {filteredPosts.length > 0 ? (
          <ReaderList posts={filteredPosts} />
        ) : (
          <div className="no-results-box">
            <h3>No studio dispatches found</h3>
            <p>Try adjusting your search query or topic filter.</p>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArticlesPage;