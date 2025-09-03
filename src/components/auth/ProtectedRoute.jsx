import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * A wrapper component for routes that require authentication
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} [props.requiredModule] - Optional module name that the user must have access to
 * @returns {React.ReactNode} - The protected component or redirect
 */
export default function ProtectedRoute({ children, requiredModule }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If module access is required, check permissions
  if (requiredModule) {
    const hasAccess = user.accessible_modules?.includes(requiredModule) || user.role === 'Admin';
    
    if (!hasAccess) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4 text-center">
            You don't have permission to access this page. Please contact your administrator.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      );
    }
  }

  // If authenticated and has access, render the children
  return children;
}
