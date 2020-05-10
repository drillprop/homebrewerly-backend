import 'dotenv/config';
import App from './app';
import RecipesController from './recipes/recipe.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new RecipesController()], 5000);

app.listen();
