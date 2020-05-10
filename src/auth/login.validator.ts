import { IsString, IsEmail } from 'class-validator';

export default class LoginValidator {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
