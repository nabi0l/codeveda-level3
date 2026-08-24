import { Link } from 'react-router-dom';
import './TimelineItem.css';

function TimelineItem({ post, index }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryClass = (category) => {
    return (category || '').toLowerCase().replace(/\s+/g, '-');
  };

  const calculateReadingTime = (content) => {
    if (!content) return 3;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <div className="timeline-item">
      <div className="timeline-node">
        <span className="node-inner-dot"></span>
      </div>

      <div className="timeline-meta-col">
        <time className="timeline-date">{formatDate(post.createdAt)}</time>
        <span className={`badge badge-${getCategoryClass(post.category)} timeline-badge`}>
          {post.category}
        </span>
        <span className="timeline-read-time">{calculateReadingTime(post.content)} min read</span>
      </div>

      <article className="timeline-card-wrapper">
        <Link to={`/article/${post.slug}`} className="timeline-card-link">
          <div className="timeline-card-content">
            <h3 className="timeline-card-title">{post.title}</h3>
            <p className="timeline-card-excerpt">{post.excerpt}</p>
            
            {post.tags && post.tags.length > 0 && (
              <div className="timeline-card-tags">
                {post.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="timeline-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.coverImage && (
            <div className="timeline-card-image-box">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="timeline-card-img" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop';
                }}
              />
            </div>
          )}
        </Link>
      </article>
    </div>
  );
}

export default TimelineItem;
