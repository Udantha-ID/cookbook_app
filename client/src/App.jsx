import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomeFeed from './pages/ResipeManagement/HomeFeed';


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeFeed />} />
          </Routes>
        </main>
        
        
      </div>
    </Router>
  );
}

export default App;