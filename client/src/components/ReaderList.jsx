import ReaderListItem from './ReaderListItem';
import './ReaderList.css';

function ReaderList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="reader-list-empty">
        <p>No articles to display</p>
      </div>
    );
  }

  return (
    <div className="reader-list">
      {posts.map((post) => (
        <ReaderListItem key={post._id} post={post} />
      ))}
    </div>
  );
}

export default ReaderList;
