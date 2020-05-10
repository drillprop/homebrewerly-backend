import 'dotenv/config';
import App from './app';
import AuthController from './auth/auth.controller';
import RecipesController from './recipes/recipe.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new AuthController(), new RecipesController()]);

app.listen();
