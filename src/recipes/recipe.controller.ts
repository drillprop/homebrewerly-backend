import express, { Request, Response } from 'express';
import Recipe from './recipe.interface';
import RecipeModel from './recipe.model';
import Controller from 'interfaces/controller.interface';

export default class RecipesController implements Controller {
  public path = '/recipes';
  public router = express.Router();
  private recipe = RecipeModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllRecipes);
    this.router.get(`${this.path}/:id`, this.getRecipeById);
    this.router.patch(`${this.path}/:id`, this.modifyRecipe);
    this.router.post(this.path, this.createRecipe);
  }

  private getAllRecipes = async (req: Request, res: Response) => {
    const allRecipes = await this.recipe.find().exec();
    res.send(allRecipes);
  };

  private getRecipeById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const recipe = await this.recipe.findById(id).exec();
    res.send(recipe);
  };

  private modifyRecipe = async (req: Request, res: Response) => {
    const id = req.params.id;
    const newRecipeData: Recipe = req.body;
    const recipe = await this.recipe
      .findByIdAndUpdate(id, newRecipeData, {
        new: true,
      })
      .exec();
    res.send(recipe);
  };

  private createRecipe = async (req: Request, res: Response) => {
    const recipeData: Recipe = req.body;
    const createdRecipe = new this.recipe(recipeData);
    const savedPost = await createdRecipe.save();
    res.send(savedPost);
  };
}
