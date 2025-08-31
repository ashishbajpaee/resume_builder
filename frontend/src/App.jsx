import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import UserProvider from './context/UserContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Builder from './pages/Builder'
import Templates from './pages/Templates'
import Preview from './pages/Preview'
import NotFound from './pages/NotFound'
import Header from './components/Header'

// Navigation Guard Component
const NavigationGuard = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Prevent back navigation to login/signup pages
    const handleBeforeUnload = (e) => {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        // Clear any stored navigation history that might lead back to auth pages
        sessionStorage.removeItem('authRedirect')
      }
    }

    // Handle browser back/forward buttons
    const handlePopState = (e) => {
      const currentPath = location.pathname
      const isAuthPage = currentPath === '/login' || currentPath === '/signup'
      const isLandingPage = currentPath === '/'
      
      // If trying to go back to auth pages, redirect to dashboard
      if (isAuthPage) {
        navigate('/dashboard', { replace: true })
        return
      }
      
      // If on landing page and trying to go back, redirect to dashboard
      if (isLandingPage) {
        navigate('/dashboard', { replace: true })
        return
      }
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [location, navigate])

  return children
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// App Layout Component
const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <UserProvider>
      <NavigationGuard>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes with Header */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/builder" element={
            <ProtectedRoute>
              <AppLayout>
                <Builder />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/templates" element={
            <ProtectedRoute>
              <AppLayout>
                <Templates />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/preview" element={
            <ProtectedRoute>
              <AppLayout>
                <Preview />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </NavigationGuard>
    </UserProvider>
  )
}

export default App
