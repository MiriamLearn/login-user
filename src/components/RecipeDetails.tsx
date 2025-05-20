
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Recipe } from '../store/recipesSlice';

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{recipe.title}</Typography>
        <Typography variant="body1">{recipe.description}</Typography>
        <Typography variant="h6">Ingredients:</Typography>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <Typography variant="h6">Instructions:</Typography>
        <Typography variant="body1">{recipe.instructions}</Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeDetails;
