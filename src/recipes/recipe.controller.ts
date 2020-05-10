import express, { Request, Response, response } from 'express';
import Recipe from './recipe.interface';
import RecipeModel from './recipe.model';

export default class RecipesController {
  public path = '/recipes';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllRecipes);
    this.router.post(this.path, this.createRecipe);
  }

  getAllRecipes = async (req: Request, res: Response) => {
    const allRecipes = await RecipeModel.find().exec();
    res.send(allRecipes);
  };

  createRecipe = async (req: Request, res: Response) => {
    const recipeData: Recipe = req.body;
    const createdRecipe = new RecipeModel(recipeData);
    const savedPost = await createdRecipe.save();
    res.send(savedPost);
  };
}
