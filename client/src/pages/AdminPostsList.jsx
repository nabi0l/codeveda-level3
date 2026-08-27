import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postsApi from '../api/posts';
import { formatDate, getErrorMessage } from '../utils/formatters';
import './AdminPostsList.css';

const AdminPostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postsApi.getAllPosts();
        const postsArray = Array.isArray(data) ? data : [];
        setPosts(postsArray);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to load posts. Please try again later.'));
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await postsApi.deletePost(postId);
      setPosts(posts.filter(post => post._id !== postId));
      setDeleteConfirm(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete post. Please try again.'));
      console.error('Error deleting post:', err);
    }
  };

  if (loading) {
    return (
      <div className="admin-posts-list">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-posts-list">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-posts-list">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Studio Desk & Dispatches</h1>
          <Link to="/admin/posts/new" className="btn btn-primary">
            + New Dispatch
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No studio dispatches published yet. Start drafting your first entry!</p>
            <Link to="/admin/posts/new" className="btn btn-primary">
              Draft Dispatch
            </Link>
          </div>
        ) : (
          <div className="posts-table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Dispatch Title</th>
                  <th>Topic</th>
                  <th>Visibility</th>
                  <th>Date Filed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td className="post-title-cell">
                      <Link to={`/article/${post.slug}`} className="post-link">
                        {post.title}
                      </Link>
                    </td>
                    <td>{post.category}</td>
                    <td>
                      {post.featured ? (
                        <span className="badge badge-featured">Lead Essay</span>
                      ) : (
                        <span className="badge badge-normal">Standard</span>
                      )}
                    </td>
                    <td>{formatDate(post.createdAt, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td className="actions-cell">
                      <Link 
                        to={`/admin/posts/${post._id}/edit`}
                        className="btn btn-edit"
                      >
                        Edit
                      </Link>
                      <button 
                        className="btn btn-delete"
                        onClick={() => setDeleteConfirm(post._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {deleteConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to remove this dispatch from the studio archive? This action cannot be undone.</p>
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete Dispatch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPostsList;