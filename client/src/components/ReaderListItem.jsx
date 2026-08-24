import { Link } from 'react-router-dom';
import './ReaderListItem.css';

function ReaderListItem({ post }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadingTime = (content) => {
    if (!content) return 3;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const getCategoryClass = (category) => {
    return (category || '').toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <article className="reader-item">
      <div className="reader-item-header">
        <span className={`badge badge-${getCategoryClass(post.category)} reader-badge`}>
          {post.category}
        </span>
        <div className="reader-item-meta">
          <time className="reader-meta-item">{formatDate(post.createdAt)}</time>
          <span className="reader-meta-divider">•</span>
          <span className="reader-meta-item">{calculateReadingTime(post.content)} min read</span>
        </div>
      </div>

      <h2 className="reader-item-title">
        <Link to={`/article/${post.slug}`} className="reader-item-link">
          {post.title}
        </Link>
      </h2>

      <p className="reader-item-excerpt">{post.excerpt}</p>

      <div className="reader-item-footer">
        {post.tags && post.tags.length > 0 && (
          <div className="reader-item-tags">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="reader-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <Link to={`/article/${post.slug}`} className="reader-read-link">
          Read Story &rarr;
        </Link>
      </div>
    </article>
  );
}

export default ReaderListItem;
