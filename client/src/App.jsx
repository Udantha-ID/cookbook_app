import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealPlan from './pages/MealPlan/MealPlanner.jsx';
<<<<<<< HEAD
import AddMeal from './pages/MealPlan/AddMeal.jsx'
import EditMeal from './pages/MealPlan/EditMeal.jsx'

=======
import AddMeal from './pages/MealPlan/AddMeal.jsx;
>>>>>>> fb1e409ef7caed0c7ac5fd7951cb8d9c0f6d6b89
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
            <Route path="/edit-meal/:id" element={<EditMeal />} />
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