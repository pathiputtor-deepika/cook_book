import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const UpdateRecipe = () => {
  const { id, type } = useParams(); 
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: '',
    type: type || 'healthy', 
    ingredients: [{ name: '', quantity: '' }],
    instructions: [''],
    url: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = type === 'fast_food' ? 'fast_foods' : 'health_recipes';

    // Fetch the recipe by ID and type
    axios
      .get(`http://localhost:3000/${endpoint}/${id}`)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      });
  }, [id, type]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', quantity: '' }],
    });
  };

  

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions[index] = value;
    setRecipe({ ...recipe, instructions: updatedInstructions });
  };

  const handleAddInstruction = () => {
    setRecipe({
      ...recipe,
      instructions: [...recipe.instructions, ''],
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = type === 'fast_food' ? 'fast_foods' : 'health_recipes';

    axios
      .put(`http://localhost:3000/${endpoint}/${id}`, recipe)
      .then(() => {
        alert('Recipe updated successfully');
        navigate(type === 'fast_food' ? '/fast-foods' : '/health-recipes'); // Navigate to the appropriate category
      })
      .catch((error) => {
        console.error('Error updating recipe:', error);
        alert('Failed to update recipe. Please try again.');
      });
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  return (
    <div className="form-container">
      <h1 className="moni">Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
          required
        />

        

        <h3 className="moni">Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              required
            />
            
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient} className="add-button">
          Add Ingredient
        </button>

        <h3 className="moni">Instructions</h3>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className="instruction-row">
            <textarea
              placeholder={`Step ${index + 1}`}
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
            />
            
          </div>
        ))}
        <button type="button" onClick={handleAddInstruction} className="add-button">
          Add Instruction
        </button>

        <input
          type="url"
          placeholder="Recipe Image URL"
          value={recipe.url}
          onChange={(e) => setRecipe({ ...recipe, url: e.target.value })}
          required
        />

        <button type="submit" className="submit-button">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
