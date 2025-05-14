import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Home component with authentication status
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          BestChallenges
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to BestChallenges, a platform for creating and tracking cycling challenges.
        </p>
        <p className="text-gray-700 mb-4">
          This is a demo application built with React, TypeScript, and FastAPI.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

// Dashboard component (protected)
const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Dashboard
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to your dashboard! This page is protected and only accessible when you're logged in.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
