import TimelineItem from './TimelineItem';
import './TimelineList.css';

function TimelineList({ posts, title = "Studio Chronicle & Field Archives" }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="timeline-section">
      <div className="timeline-header-wrapper">
        <span className="section-label">STUDIO CHRONICLE</span>
        <h2 className="timeline-section-title">{title}</h2>
        <p className="timeline-subtitle">
          A running record of studio experiments, client retrospectives, and evolving thoughts on digital craft.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-vertical-spine"></div>
        <div className="timeline-list">
          {posts.map((post, index) => (
            <TimelineItem key={post._id || index} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TimelineList;
