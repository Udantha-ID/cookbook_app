import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealPlan from './pages/MealPlan/MealPlanner.jsx';
import AddMeal from './pages/MealPlan/AddMeal.jsx;
import Homefeed from './pages/ResipeManagement/HomeFeed.jsx'
import Navbar from './components/Navbar';
import HomeFeed from './pages/ResipeManagement/HomeFeed';
import RecipeDetail from './pages/ResipeManagement/ResipeDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
       
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homefeed />} />
            <Route path="/meal-planner" element={<MealPlan />} />
            <Route path="/addmeal" element={<AddMeal />} />
          </Routes>
        </main>
        
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