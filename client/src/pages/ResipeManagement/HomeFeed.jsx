import React from 'react';
import Navbar from '../../components/Navbar';
import RecipeForm from '../ResipeManagement/ResipeForm';
import RecipeCard from '../ResipeManagement/ResipeCard';

function HomeFeed() {
  return (
    <div>
      <Navbar />
      <RecipeForm />
      <RecipeCard />
      <RecipeCard />
    </div>
  );
}

export default HomeFeed;
