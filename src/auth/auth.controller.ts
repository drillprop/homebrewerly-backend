import express, { NextFunction, Request, Response, response } from 'express';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import UserModel from '../user/user.model';
import RegisterValidator from './register.validator';
import UserExistsException from '../exceptions/UserExistsException';
import bcrypt from 'bcrypt';

export default class AuthController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = UserModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegisterValidator),
      this.register
    );
    this.router.post(`${this.path}/login`, this.login);
  }

  private async register(req: Request, res: Response, next: NextFunction) {
    const { nick, email, password }: RegisterValidator = req.body;
    if (await this.user.findOne({ email })) {
      next(new UserExistsException(email));
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await this.user.create({
        nick,
        email,
        password: hashedPassword,
      });
      delete user.password;
      response.send(user);
    }
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    // login
  }
}
