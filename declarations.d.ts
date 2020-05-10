declare module 'envalid';

declare namespace NodeJS {
  export interface ProcessEnv {
    MONGODB_URL: string;
    PORT: 4000;
  }
}
