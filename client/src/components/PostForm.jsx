import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import postsApi from '../api/posts';
import { CATEGORY_NAMES } from '../utils/categories';
import { generateSlug, getErrorMessage } from '../utils/formatters';
import './PostForm.css';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: CATEGORY_NAMES[0] || 'UI Design',
    tags: '',
    featured: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(isEditing);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isEditing) return;

      try {
        setFetchLoading(true);
        const currentPost = await postsApi.getPostById(id);
        
        if (currentPost) {
          setFormData({
            title: currentPost.title,
            slug: currentPost.slug,
            excerpt: currentPost.excerpt || '',
            content: currentPost.content,
            coverImage: currentPost.coverImage || '',
            category: currentPost.category,
            tags: currentPost.tags ? currentPost.tags.join(', ') : '',
            featured: currentPost.featured
          });
        }
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to load post. Please try again.'));
        console.error('Error fetching post:', err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchPost();
  }, [id, isEditing]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: prev.slug === '' ? generateSlug(newTitle) : prev.slug
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEditing) {
        await postsApi.updatePost(id, postData);
      } else {
        await postsApi.createPost(postData);
      }

      navigate('/admin/posts');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to save post. Please try again.'));
      console.error('Error saving post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="post-form">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-form">
      <div className="form-container">
        <div className="form-header">
          <h1>{isEditing ? 'Edit Studio Dispatch' : 'Draft New Dispatch'}</h1>
          <Link to="/admin/posts" className="btn btn-secondary">
            Cancel
          </Link>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="post-form-form">
          <div className="form-group">
            <label htmlFor="title">Dispatch Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              required
              placeholder="e.g. The Case Against Default Minimalism"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">URL Slug *</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="url-friendly-slug"
            />
            <small className="form-help">Clean permalink URL identifier for this dispatch</small>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Studio Abstract / Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              placeholder="A 2-3 sentence overview of this essay, field reflection, or case study..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Dispatch Body (Markdown) *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="15"
              required
              placeholder="Write your studio dispatch here (supports # headings, > blockquotes, ``` code blocks, **bold** text)..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Studio Topic *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {CATEGORY_NAMES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Craft Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="typography, design systems, craft (comma-separated)"
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span>Feature as Lead Studio Essay</span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Publishing...' : (isEditing ? 'Update Dispatch' : 'Publish Dispatch')}
            </button>
            <Link to="/admin/posts" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;