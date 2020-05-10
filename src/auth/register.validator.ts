import { IsString, IsEmail, Min } from 'class-validator';

export default class RegisterValidator {
  @IsString()
  public nick: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Min(6)
  public password: string;
}
