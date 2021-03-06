import express, { NextFunction, Request, Response } from 'express';
import RecipeNotFoundException from '../exceptions/RecipeNotFoundException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import Recipe from './recipe.interface';
import RecipeModel from './recipe.model';
import CreateRecipeValidator from './recipe.validator';

export default class RecipesController implements Controller {
  public path = '/recipes';
  public router = express.Router();
  private recipe = RecipeModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllRecipes);
    this.router.get(`${this.path}/:id`, this.getRecipeById);
    this.router.post(
      this.path,
      validationMiddleware(CreateRecipeValidator),
      this.createRecipe
    );
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreateRecipeValidator, true),
      this.modifyRecipe
    );
    this.router.delete(`${this.path}/:id`, this.deleteRecipe);
  }

  private getAllRecipes = async (req: Request, res: Response) => {
    const allRecipes = await this.recipe.find().exec();
    res.send(allRecipes);
  };

  private getRecipeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const recipe = await this.recipe.findById(id).exec();
    if (recipe) {
      res.send(recipe);
    } else {
      next(new RecipeNotFoundException(id));
    }
  };

  private createRecipe = async (req: Request, res: Response) => {
    const recipeData: Recipe = req.body;
    const createdRecipe = new this.recipe(recipeData);
    const savedPost = await createdRecipe.save();
    res.send(savedPost);
  };

  private modifyRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const newRecipeData: Recipe = req.body;
    const recipe = await this.recipe
      .findByIdAndUpdate(id, newRecipeData, {
        new: true,
      })
      .exec();
    if (recipe) {
      res.send(recipe);
    } else {
      next(new RecipeNotFoundException(id));
    }
  };

  private deleteRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const deleteResponse = await this.recipe.findByIdAndDelete(id).exec();
    if (deleteResponse) {
      res.sendStatus(200);
    } else {
      next(new RecipeNotFoundException(id));
    }
  };
}
