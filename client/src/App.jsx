import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Techniques from './pages/CookingTech/Techniques';
import AddCookingTech from './pages/CookingTech/AddCookingTech';
import EditCookingTech from './pages/CookingTech/EditCookingTech';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Techniques />} />
          <Route path="/add-technique" element={<AddCookingTech/>} />
          <Route path="/edit-technique/:id" element={<EditCookingTech/>} />
          <Route path="/techniques" element={<Techniques />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


