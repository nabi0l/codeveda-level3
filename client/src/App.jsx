import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AllArticlesPage from './pages/AllArticlesPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminPostsList from './pages/AdminPostsList';
import PostForm from './components/PostForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog/:category" element={<CategoryPage />} />
              <Route path="/articles" element={<AllArticlesPage />} />
              <Route path="/article/:slug" element={<PostDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/admin/posts" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPostsList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/posts/new" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <PostForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/posts/:id/edit" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <PostForm />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
