import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomeFeed from './pages/ResipeManagement/HomeFeed';
import RecipeDetail from './pages/ResipeManagement/ResipeDetail';

function App() {
  return (
    <Router>
      <div className="app">
        
        
        <main className="main-content px-4 py-2 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;