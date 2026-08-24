import PostCard from './PostCard';
import './RelatedPosts.css';

const RelatedPosts = ({ posts, currentPostId }) => {
  if (!posts || posts.length === 0) return null;

  const relatedPosts = posts
    .filter(post => post._id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="related-posts">
      <div className="related-header">
        <span className="section-label">MORE DISPATCHES</span>
        <h2 className="related-posts-title">From the Studio Archive</h2>
      </div>

      <div className="related-posts-grid">
        {relatedPosts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;