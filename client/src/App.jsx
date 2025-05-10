import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealPlan from './pages/MealPlan/MealPlanner.jsx';
import AddMeal from './pages/MealPlan/AddMeal.jsx';
import HomeFeed from './pages/ResipeManagement/HomeFeed.jsx';
import RecipeDetail from './pages/ResipeManagement/ResipeDetail';
import EditMeal from './pages/MealPlan/EditMeal.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow px-4 py-2 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/meal-planner" element={<MealPlan />} />
            <Route path="/addmeal" element={<AddMeal />} />
            <Route path='edit-meal/:id' element={<EditMeal/>}/>
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;