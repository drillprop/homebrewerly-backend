import express, { Application } from 'express';
import bodyParser from 'body-parser';
import Controller from 'interfaces/controller.interface';
import mongoose from 'mongoose';

export default class App {
  public app: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDB();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToDB() {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`server started at port ${this.port}`);
    });
  }
}
