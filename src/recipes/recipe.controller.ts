import express, { Request, Response, response } from 'express';
import Recipe from './recipe.interface';

export default class RecipesController {
  public path = '/recipes';
  public router = express.Router();

  private recipes: Recipe[] = [
    {
      author: 'John Homebrewer',
      name: 'New England Ipa',
      body: 'Lorem ipsum',
    },
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllRecipes);
    this.router.post(this.path, this.createRecipe);
  }

  getAllRecipes = (req: Request, res: Response) => {
    response.send(this.recipes);
  };

  createRecipe = (req: Request, res: Response) => {
    const recipe: Recipe = req.body;
    this.recipes.push(recipe);
    res.send(recipe);
  };
}
