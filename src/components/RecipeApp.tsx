
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import RecipeDetails from './RecipeDetails';
import { AppDispatch, RootState } from '../store/recipeStore';
import { fetchRecipeById, fetchRecipes } from '../store/recipesSlice';

function renderRow(props: ListChildComponentProps, handleClick: (index: number) => void, _recipes: any[]) {
    const { index, style, data } = props;
    const recipe = data[index];

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={() => handleClick(index)}>
                <ListItemText primary={recipe.title} />
            </ListItemButton>
        </ListItem>
    );
}

const Recipes = () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        const recipeId = recipes[index].id;
        dispatch(fetchRecipeById(recipeId));
        setSelectedRecipeIndex(index);
    };

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100vh',
            gap: 4,
            backgroundColor: '#f5f5f5',
            padding: 3,
        }}>

            <Box sx={{
                width: '300px', paddingRight: '30px',
                marginTop: '30px', borderRadius: '10px'
            }}>
                {selectedRecipeIndex !== null && recipes[selectedRecipeIndex] ? (
                    <RecipeDetails recipe={recipes[selectedRecipeIndex]} />
                ) : (
                    <p>בחר מתכון לצפייה בפרטים</p>
                )}
            </Box>

            <Box sx={{
                width: '400px', borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#eeecd9'
            }}>
                <h2>Recipes List</h2>
                <FixedSizeList
                    height={400}
                    width={300}
                    itemSize={46}
                    itemCount={recipes.length}
                    overscanCount={5}
                    itemData={recipes}
                >
                    {(props) => renderRow(props, handleClick, recipes)}
                </FixedSizeList>
            </Box>
        </Box>
    );
};

export default Recipes;
