import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

export default (
  validator: any,
  skipMissingProperties = false
): RequestHandler => {
  return async (req, res, next) => {
    const bodyToClass = plainToClass(validator, req.body);
    const errors: ValidationError[] = await validate(bodyToClass, {
      skipMissingProperties,
    });
    if (errors.length > 0) {
      const message = errors
        .map(({ constraints }) => {
          constraints && Object.values(constraints);
        })
        .join(', ');
      next(new HttpException(400, message));
    } else {
      next();
    }
  };
};
