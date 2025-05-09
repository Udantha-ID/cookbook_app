
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import MealPlanner from './pages/MealPlan/MealPlanner';

function App() {
  return (
    <Router>
     
       
        
          <Routes>
           
            <Route path="/" element={<MealPlanner />} />
            {/* Add more routes as needed */}
          </Routes>
        
       
      
    </Router>
  );
}

export default App;


