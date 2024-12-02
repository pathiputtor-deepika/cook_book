import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const RecipeList = ({ category = 'health' }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const url =
      category === 'health'
        ? 'http://localhost:3000/health_recipes'
        : 'http://localhost:3000/fast_foods'; // Fetching Fast Food recipes if category is "fast"

    axios
      .get(url)
      .then((res) => setRecipes(res.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, [category]);

  const handleDelete = (id) => {
    const url =
      category === 'health'
        ? `http://localhost:3000/health_recipes/${id}`
        : `http://localhost:3000/fast_foods/${id}`;

    axios
      .delete(url)
      .then(() => {
        alert('Recipe deleted');
        setRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== id));
      })
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  return (
    <div className="recipe-container">
      <h2>{category === 'health' ? 'Healthy Recipes' : 'Fast Food Recipes'}</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.url} alt={recipe.name} className="recipe-image" />
            <h3>{recipe.name}</h3>
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{`${ingredient.name} - ${ingredient.quantity}`}</li>
              ))}
            </ul>
            <p>
              <strong>Instructions:</strong>
            </p>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <div className="card-actions">
              <Link
                to={`/update/${category === 'health' ? 'healthy' : 'fast_food'}/${recipe.id}`}
                className="edit-button"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
