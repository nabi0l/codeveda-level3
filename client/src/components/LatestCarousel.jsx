import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, calculateReadingTime, getCategoryClass, IMAGE_FALLBACK } from '../utils/formatters';
import './LatestCarousel.css';

function LatestCarousel({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!posts || posts.length === 0) return null;

  const visiblePosts = posts.slice(0, 5);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % visiblePosts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + visiblePosts.length) % visiblePosts.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="carousel-section">
      <div className="carousel-header-wrapper">
        <div className="carousel-header-left">
          <span className="section-label">FROM THE STUDIO WORKBENCH</span>
          <h2 className="carousel-section-title">Recent Dispatches & Field Notes</h2>
        </div>

        <div className="carousel-controls">
          <button 
            onClick={prevSlide} 
            className="carousel-nav-btn"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="carousel-page-indicator">
            <span className="current-page">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="page-separator">/</span>
            <span className="total-pages">{String(visiblePosts.length).padStart(2, '0')}</span>
          </div>

          <button 
            onClick={nextSlide} 
            className="carousel-nav-btn"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="carousel-viewport">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {visiblePosts.map((post, idx) => (
            <div key={post._id || idx} className="carousel-slide">
              <article className="carousel-card">
                <Link to={`/article/${post.slug}`} className="carousel-card-link">
                  <div className="carousel-image-container">
                    <img 
                      src={post.coverImage || 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop'} 
                      alt={post.title} 
                      className="carousel-card-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = IMAGE_FALLBACK;
                      }}
                    />
                    <span className={`badge badge-${getCategoryClass(post.category)} carousel-card-badge`}>
                      {post.category}
                    </span>
                  </div>

                  <div className="carousel-card-body">
                    <div className="carousel-card-meta">
                      <time>{formatDate(post.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                      <span>•</span>
                      <span>{calculateReadingTime(post.content)} min read</span>
                    </div>

                    <h3 className="carousel-card-title">{post.title}</h3>
                    <p className="carousel-card-excerpt">{post.excerpt}</p>

                    <div className="carousel-card-footer">
                      <span className="read-more-text">Read Story</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="read-more-arrow">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {visiblePosts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default LatestCarousel;
