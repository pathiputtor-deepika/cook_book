import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './Components/RecipeList';
import AddRecipe from './Components/AddRecipe';
import UpdateRecipe from './Components/UpdateRecipe';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipeList category="health" />} />
        <Route path="/health-recipes" element={<RecipeList category="health" />} />
        <Route path="/fast-foods" element={<RecipeList category="fast" />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/update/:type/:id" element={<UpdateRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
