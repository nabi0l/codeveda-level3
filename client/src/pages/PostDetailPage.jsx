import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RelatedPosts from '../components/RelatedPosts';
import postsApi from '../api/posts';
import { getPostAuthor } from '../utils/authors';
import { formatDate, calculateReadingTime, getCategoryClass, getFallbackAvatar } from '../utils/formatters';
import './PostDetailPage.css';

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setToastMessage('Link copied to clipboard!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const formatContent = (content) => {
    if (!content) return '';
    
    let formatted = content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote className="pull-quote"><p>$1</p></blockquote>');

    const paragraphs = formatted.split(/\n\n+/);
    return paragraphs
      .map(p => {
        if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<block')) {
          return p;
        }
        return `<p>${p.replace(/\n/g, '<br />')}</p>`;
      })
      .join('');
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        const postData = await postsApi.getPostBySlug(slug);
        setPost(postData);

        if (postData && postData.category) {
          const allPosts = await postsApi.getAllPosts();
          const postsArray = Array.isArray(allPosts) ? allPosts : [];
          setRelatedPosts(postsArray.filter(p => p.category === postData.category));
        }

        setError(null);
      } catch (err) {
        setError('Failed to load article. The requested post might have been moved or deleted.');
        console.error('Error fetching post detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="post-detail-page container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading studio dispatch...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-page container">
        <div className="error-state">
          <p>{error || 'Studio dispatch not found.'}</p>
          <Link to="/articles" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
            Browse The Archive
          </Link>
        </div>
      </div>
    );
  }

  const author = getPostAuthor(post);

  return (
    <div className="post-detail-page">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {toastMessage && (
        <div className="toast-notification">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {toastMessage}
        </div>
      )}

      <div className="container container-narrow">
        <article className="post-article">
          <nav className="article-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to={`/blog/${getCategoryClass(post.category)}`}>{post.category}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Studio Dispatch</span>
          </nav>

          <header className="article-header">
            <div className="article-header-top">
              <span className={`badge badge-${getCategoryClass(post.category)}`}>
                {post.category}
              </span>
              <span className="meta-bullet">•</span>
              <time className="article-header-date">{formatDate(post.createdAt)}</time>
              <span className="meta-bullet">•</span>
              <span className="article-header-time">{calculateReadingTime(post.content)} MIN READ</span>
            </div>

            <h1 className="article-title">{post.title}</h1>

            {post.excerpt && (
              <p className="article-subtitle">{post.excerpt}</p>
            )}

            <div className="article-author-bar">
              <div className="author-meta">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="author-avatar-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getFallbackAvatar(author.name);
                  }}
                />
                <div className="author-details">
                  <span className="author-full-name">{author.name}</span>
                  <span className="author-title">{author.role}, Atelier Studio</span>
                </div>
              </div>

              <div className="article-actions">
                <button className="action-btn" onClick={copyToClipboard} title="Share Link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  <span>Share</span>
                </button>
                <button className="action-btn" onClick={copyToClipboard} title="Copy URL">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <figure className="article-cover-figure">
              <img src={post.coverImage} alt={post.title} className="article-cover-img" />
              <figcaption className="cover-caption">
                Studio Field Note • Visual Architecture & Interface Craft.
              </figcaption>
            </figure>
          )}

          <div 
            className="article-body prose"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          <div className="key-takeaways-box">
            <div className="takeaway-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="takeaway-icon">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <span>STUDIO CRAFT PRINCIPLE</span>
            </div>
            <p>
              Great digital design is never just about aesthetics—it is about clarity of thought, predictable interactions, and human empathy. Build tools that respect the user’s attention and time.
            </p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="article-tags-section">
              <span className="tags-label">TAGGED IN:</span>
              <div className="tags-pill-list">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="article-tag-item">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="article-author-card">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="author-card-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getFallbackAvatar(author.name);
              }}
            />
            <div className="author-card-info">
              <h3>Written by {author.name}</h3>
              <p>{author.bio}</p>
            </div>
          </div>

          <RelatedPosts posts={relatedPosts} currentPostId={post._id} />
        </article>
      </div>
    </div>
  );
};

export default PostDetailPage;