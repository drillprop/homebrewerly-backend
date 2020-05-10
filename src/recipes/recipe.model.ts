import mongoose from 'mongoose';
import Recipe from './recipe.interface';

const recipeSchema = new mongoose.Schema({
  author: String,
  name: String,
  body: String,
});

const RecipeModel = mongoose.model<Recipe & mongoose.Document>(
  'Recipe',
  recipeSchema
);

export default RecipeModel;
