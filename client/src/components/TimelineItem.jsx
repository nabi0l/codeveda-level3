import { Link } from 'react-router-dom';
import { formatDate, calculateReadingTime, getCategoryClass, IMAGE_FALLBACK } from '../utils/formatters';
import './TimelineItem.css';

function TimelineItem({ post, index }) {
  return (
    <div className="timeline-item">
      <div className="timeline-node">
        <span className="node-inner-dot"></span>
      </div>

      <div className="timeline-meta-col">
        <time className="timeline-date">{formatDate(post.createdAt, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
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
                  e.target.src = IMAGE_FALLBACK;
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
