import App from './app';
import RecipesController from './recipes/recipe.controller';

const app = new App([new RecipesController()], 5000);

app.listen();
