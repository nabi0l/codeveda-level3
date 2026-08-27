import { Link } from 'react-router-dom';
import { getPostAuthor } from '../utils/authors';
import { formatDate, calculateReadingTime, getCategoryClass, getFallbackAvatar } from '../utils/formatters';
import './FeaturedPost.css';

function FeaturedPost({ post }) {
  if (!post) return null;

  const author = getPostAuthor(post);

  return (
    <section className="featured-section">
      <div className="featured-section-label">
        <span className="section-label">LEAD STUDIO ESSAY</span>
        <span className="editorial-line"></span>
      </div>

      <article className="featured-card">
        <div className="featured-image-wrapper">
          <img 
            src={post.coverImage || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop'} 
            alt={post.title} 
            className="featured-cover-image" 
            loading="eager"
          />
          <div className="featured-image-overlay"></div>
          <span className="featured-ribbon">FEATURED ESSAY</span>
        </div>
        
        <div className="featured-content">
          <div className="featured-meta-top">
            <span className={`badge badge-${getCategoryClass(post.category)}`}>
              {post.category}
            </span>
            <span className="meta-bullet">•</span>
            <time className="featured-date">{formatDate(post.createdAt)}</time>
            <span className="meta-bullet">•</span>
            <span className="featured-read-time">{calculateReadingTime(post.content)} MIN READ</span>
          </div>
          
          <h1 className="featured-title">
            <Link to={`/article/${post.slug}`}>
              {post.title}
            </Link>
          </h1>
          
          <p className="featured-excerpt">{post.excerpt}</p>
          
          <div className="featured-footer">
            <div className="featured-author">
              <div className="author-avatar">
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getFallbackAvatar(author.name);
                  }}
                />
              </div>
              <div className="author-info">
                <span className="author-name">{author.name}</span>
                <span className="author-role">{author.role}</span>
              </div>
            </div>

            <Link to={`/article/${post.slug}`} className="btn btn-primary btn-lg featured-cta">
              <span>Read Essay</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}

export default FeaturedPost;
