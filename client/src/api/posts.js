import api from './axiosConfig';

const postsApi = {
  getAllPosts: async (params = {}) => {
    const response = await api.get('/posts', { params });
    return response.data.posts || response.data;
  },

  getPostBySlug: async (slug) => {
    const response = await api.get(`/posts/${slug}`);
    return response.data.post || response.data;
  },

  getPostById: async (id) => {
    const response = await api.get(`/posts/id/${id}`);
    return response.data.post || response.data;
  },

  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data.post || response.data;
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data.post || response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  }
};

export default postsApi;
