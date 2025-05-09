import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealPlan from './pages/MealPlan/MealPlanner.jsx';
import AddMeal from './pages/MealPlan/AddMeal.jsx'


import Homefeed from './pages/ResipeManagement/HomeFeed.jsx'

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
        
      </div>
    </Router>
  );
}

export default App;