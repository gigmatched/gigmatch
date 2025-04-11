// File: frontend/src/App.jsx
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AdminBlogList from './pages/AdminBlogList';
import CreateBlogPost from './pages/CreateBlogPost';
import EditBlogPost from './pages/EditBlogPost';
import OurStory from './pages/OurStory';
import Contact from './pages/Contact';
import Gigs from './pages/Gigs';
import GigDetails from './pages/GigDetails';
import CreateGig from './pages/CreateGig';
import Privacy from './pages/Privacy';
import UnderConstruction from './pages/UnderConstruction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';

function App({ children }) {
  console.log('App component render edildi');
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <ToastContainer />
            <main className="flex-grow">
              <div className="container mx-auto p-4">
                <Routes>
                  {/* Turkish Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/giris" element={<Login />} />
                  <Route path="/kayitol" element={<Register />} />
                  <Route path="/gizlilik" element={<Privacy />} />
                  <Route path="/hikayemiz" element={<OurStory />} />
                  <Route path="/iletisim" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route
                    path="/profil"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/gigler" element={<Gigs />} />
                  <Route path="/gigler/:id" element={<GigDetails />} />
                  <Route
                    path="/gig-olustur"
                    element={
                      <ProtectedRoute>
                        <CreateGig />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* English Routes */}
                  <Route path="/en" element={<Home />} />
                  <Route path="/en/login" element={<Login />} />
                  <Route path="/en/register" element={<Register />} />
                  <Route path="/en/privacy" element={<Privacy />} />
                  <Route path="/en/ourstory" element={<OurStory />} />
                  <Route path="/en/contact" element={<Contact />} />
                  <Route path="/en/blog" element={<Blog />} />
                  <Route path="/en/blog/:slug" element={<BlogDetail />} />
                  <Route
                    path="/en/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/en/gigs" element={<Gigs />} />
                  <Route path="/en/gigs/:id" element={<GigDetails />} />
                  <Route
                    path="/en/create-gig"
                    element={
                      <ProtectedRoute>
                        <CreateGig />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Admin Blog Routes - No language prefix needed as these are admin-only */}
                  <Route
                    path="/admin/blog"
                    element={
                      <ProtectedRoute>
                        <AdminBlogList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/blog/create"
                    element={
                      <ProtectedRoute>
                        <CreateBlogPost />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/blog/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EditBlogPost />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route path="/underconstruction" element={<UnderConstruction />} />
                  
                  {/* Legacy routes - redirect to new paths */}
                  <Route path="/login" element={<Navigate to="/giris" replace />} />
                  <Route path="/register" element={<Navigate to="/kayitol" replace />} />
                  <Route path="/privacy" element={<Navigate to="/gizlilik" replace />} />
                  <Route path="/ourstory" element={<Navigate to="/hikayemiz" replace />} />
                  <Route path="/contact" element={<Navigate to="/iletisim" replace />} />
                  <Route path="/profile" element={<Navigate to="/profil" replace />} />
                  <Route path="/gigs" element={<Navigate to="/gigler" replace />} />
                  <Route path="/create-gig" element={<Navigate to="/gig-olustur" replace />} />
                </Routes>
              </div>
            </main>
            <Footer />
            {children}
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
