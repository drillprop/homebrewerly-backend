import { IsString } from 'class-validator';

export default class CreateRecipeValidator {
  @IsString()
  public author: string;

  @IsString()
  public title: string;

  @IsString()
  public body: string;
}
