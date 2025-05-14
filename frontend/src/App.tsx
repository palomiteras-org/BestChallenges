import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        BestChallenges
      </h1>
      <p className="text-gray-700 mb-4">
        Welcome to BestChallenges, a platform for creating and tracking cycling challenges.
      </p>
      <p className="text-gray-700">
        This is a demo application built with React, TypeScript, and FastAPI.
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;