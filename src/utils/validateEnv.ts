import { cleanEnv, str, port } from 'envalid';

export default () => {
  cleanEnv(process.env, {
    MONGODB_URL: str(),
    PORT: port(),
  });
};
