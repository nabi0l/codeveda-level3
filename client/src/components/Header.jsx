import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const categories = [
  { name: 'UI Design', slug: 'ui-design' },
  { name: 'UX Research', slug: 'ux-research' },
  { name: 'Case Study', slug: 'case-study' },
  { name: 'Tutorial', slug: 'tutorial' },
  { name: 'Notes', slug: 'notes' },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <div className="top-editorial-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="editorial-issue-badge">STUDIO DISPATCH • VOL. 04</span>
            <span className="top-bar-divider">•</span>
            <span className="editorial-tagline">RAW NOTES ON INTERFACE CRAFT & DIGITAL ARCHITECTURE</span>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-date">AUTUMN 2026</span>
            <span className="top-bar-divider">•</span>
            {isAuthenticated ? (
              <div className="top-bar-user-info">
                <span className="top-bar-username">{user?.username}</span>
                {isAdmin && (
                  <>
                    <span className="top-bar-divider">•</span>
                    <Link to="/admin/posts" className="top-bar-admin-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                      Studio Desk
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="top-bar-auth-links">
                <Link to="/login" className="top-bar-auth-link">Sign In</Link>
                <span className="top-bar-divider">•</span>
                <Link to="/register" className="top-bar-auth-link">Join Studio</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="header-logo" onClick={() => setMobileMenuOpen(false)}>
              <span className="logo-main">ATELIER JOURNAL</span>
              <span className="logo-dot">.</span>
            </Link>

            <nav className="header-nav desktop-nav">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/articles" 
                className={`nav-link ${location.pathname === '/articles' ? 'active' : ''}`}
              >
                The Archive
              </Link>
              
              <div className="nav-dropdown">
                <span className="nav-link dropdown-trigger">
                  Studio Topics
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className="dropdown-menu">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/blog/${cat.slug}`}
                      className="dropdown-item"
                    >
                      <span className={`cat-dot cat-dot-${cat.slug}`}></span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            <div className="header-actions">
              <button 
                className="icon-button search-toggle" 
                onClick={() => setSearchOpen(true)}
                aria-label="Search dispatches"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                <span className="search-label-desktop">Search</span>
              </button>

              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link to="/admin/posts/new" className="btn btn-primary btn-sm header-cta">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      New Dispatch
                    </Link>
                  )}
                  <button 
                    className="btn btn-secondary btn-sm header-cta"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary btn-sm header-cta">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm header-cta">
                    Join Studio
                  </Link>
                </>
              )}

              <button 
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <div className="container">
              <nav className="mobile-nav">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                  Home
                </Link>
                <Link to="/articles" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${location.pathname === '/articles' ? 'active' : ''}`}>
                  The Archive
                </Link>
                <div className="mobile-nav-section-title">Studio Topics</div>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/blog/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-item mobile-category-item"
                  >
                    <span className={`cat-dot cat-dot-${cat.slug}`}></span>
                    {cat.name}
                  </Link>
                ))}
                <div className="mobile-nav-divider"></div>
                <Link to="/admin/posts" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-item mobile-admin-link">
                  Studio Desk
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="search-modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal-card" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="search-input-icon">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                type="text"
                placeholder="Search studio essays, case notes, ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
              />
              <button type="button" className="search-close-btn" onClick={() => setSearchOpen(false)}>
                ESC
              </button>
            </form>
            <div className="search-quick-tags">
              <span className="quick-tag-label">Studio Topics:</span>
              {categories.map(c => (
                <button
                  key={c.slug}
                  className="quick-tag-btn"
                  onClick={() => {
                    navigate(`/blog/${c.slug}`);
                    setSearchOpen(false);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
