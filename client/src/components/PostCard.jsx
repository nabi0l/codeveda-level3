import { Link } from 'react-router-dom';
import { formatDate, getCategoryClass, IMAGE_FALLBACK } from '../utils/formatters';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <Link to={`/article/${post.slug}`} className="post-card-link">
        {post.coverImage && (
          <div className="post-card-image">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="post-card-img" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = IMAGE_FALLBACK;
              }}
            />
            <span className={`badge badge-${getCategoryClass(post.category)} post-card-badge`}>
              {post.category}
            </span>
          </div>
        )}
        <div className="post-card-content">
          <h3 className="post-card-title">{post.title}</h3>
          <p className="post-card-excerpt">{post.excerpt}</p>
          <div className="post-card-meta">
            <time>{formatDate(post.createdAt, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
            <span className="post-card-read-more">Read Story &rarr;</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;