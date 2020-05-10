import HttpException from './HttpException';

export default class UserExistsException extends HttpException {
  constructor(email: string) {
    super(409, `User with email ${email} already exists`);
  }
}
