
import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Modal, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { AppDispatch } from '../store/recipeStore';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../store/recipesSlice';
const recipeSchema = yup
    .object({
        title: yup.string().required('You must enter a title').min(3, 'The title must be at least 3 characters long'),
        description: yup.string().required('A description must be entered').min(5, 'The description must be at least 10 characters long'),
        ingredients: yup.string().required('Ingredients must be entered'),
        instructions: yup.string().required('Instructions must be entered')
    }).required();
type RecipeFormInputs = {
    title: string; description: string; ingredients: string; instructions: string;
};
const AddRecipe = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const context = useContext(UserContext);
    if (!context || context.user.id === 0) {
        alert('Your Component must be used within a UserProvider');
    }
    const dispatch = useDispatch<AppDispatch>();
    const { register, formState: { errors }, handleSubmit } = useForm<RecipeFormInputs>({
        resolver: yupResolver(recipeSchema),
    });
    const onSubmit: SubmitHandler<RecipeFormInputs> = async (data) => {
        try {
            const formattedData = {
                id: crypto.randomUUID(), authorId: context.user.id,
                title: data.title, description: data.description,
                ingredients: data.ingredients.split('\n').map(ingredient => ingredient.trim()),
                instructions: data.instructions
            };
            dispatch(addRecipe({ newRecipe: formattedData, id: context.user.id }));
            setOpenSnackbar(true);
            navigate('/recipes');
        } catch (error: any) {
            setErrorMessage('Failed to add recipe'); setOpenSnackbar(true);
        }
    };
    return (
        <>
            <Modal open={true} onClose={() => navigate('/')}>
                <Box
                    component="form" onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        padding: 2, width: 300, backgroundColor: 'white', borderRadius: 1, boxShadow: 24, zIndex: 1300,
                    }}
                >
                    <TextField
                        label="Title" fullWidth margin="normal"
                        {...register('title')} error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        label="Description" fullWidth margin="normal"
                        {...register('description')} error={!!errors.description}
                        helperText={errors.description?.message} multiline
                        rows={4}
                    />
                    <TextField
                        label="Ingredients (one per line)" fullWidth margin="normal"
                        {...register('ingredients')} error={!!errors.ingredients}
                        helperText={errors.ingredients?.message} multiline
                        rows={5}
                    />
                    <TextField
                        label="Instructions" fullWidth margin="normal"
                        {...register('instructions')} error={!!errors.instructions}
                        helperText={errors.instructions?.message} multiline
                        rows={4}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: '#C4A36D', color: 'white' }} fullWidth>
                        Add Recipe
                    </Button>
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                        <Alert severity={errorMessage ? 'error' : 'success'} variant="filled" sx={{ width: '100%' }} onClose={() => setOpenSnackbar(false)}>
                            {errorMessage ? errorMessage : 'Recipe added successfully!'}
                        </Alert>
                    </Snackbar>
                </Box>
            </Modal>
        </>
    );
};
export default AddRecipe;
