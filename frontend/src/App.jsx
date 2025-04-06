import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  {/* Public Blog Routes */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  
                  {/* Admin Blog Routes */}
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
                  
                  <Route path="/ourstory" element={<OurStory />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/gigs" element={<Gigs />} />
                  <Route path="/gigs/:id" element={<GigDetails />} />
                  <Route
                    path="/create-gig"
                    element={
                      <ProtectedRoute>
                        <CreateGig />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/underconstruction" element={<UnderConstruction />} />
                  {/* Other routes can be added here */}
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