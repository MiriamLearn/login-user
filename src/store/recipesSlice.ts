import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  authorId:number;
  ingredients: string[];
  instructions: string;
}
interface RecipesState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
}
const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
};
export const fetchRecipes = createAsyncThunk<Recipe[]>('recipes/fetchRecipes', async () => {
    const response = await fetch(`${API_BASE_URL}/api/recipes`);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return response.json();
  });
  
export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchRecipeById',
    async (id: string) => {
        
      const response = await fetch(`/api/recipes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      return await response.json();
    }
  );
  
  export const addRecipe = createAsyncThunk("recipes/addRecipe", async ({ newRecipe}: { newRecipe: Recipe, id: number }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/recipes', newRecipe, {
        headers: {
          'user-id': newRecipe.authorId
        }
      });
      return response.data;  
    }
    catch (error:any) {
      alert("Failed to add recipe")
    }
  }
  );

  const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
      clearSelectedRecipe: (state) => {
        state.selectedRecipe = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchRecipes.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
          state.recipes = action.payload;
          state.loading = false;
        })
        .addCase(fetchRecipes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch recipes';
        })
        .addCase(fetchRecipeById.fulfilled, (state, action: PayloadAction<Recipe>) => {
            state.selectedRecipe = action.payload;
        })
        .addCase(addRecipe.fulfilled, (state, action) => {
          state.recipes.push(action.payload);
        })
        .addCase(addRecipe.rejected, (state) => {
          state.error = 'Failed to add recipe';
        });
    },
  });
  
  export const { clearSelectedRecipe } = recipesSlice.actions;
  export default recipesSlice.reducer;