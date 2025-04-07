import { BadRequestException, HttpException } from '@nestjs/common';
import { AppError } from '../../../core/error/app-error';

export interface CreateUserError extends AppError {
  type: 'CreateUserError';
}

export class CreateUserExistingError implements CreateUserError {
  type: 'CreateUserError';

  constructor(private email: string) {
  }

  createHttpException(): HttpException {
    throw new BadRequestException({
      statusCode: 400,
      code: 400101,
      description: `User with email ${this.email} already exists!`,
    });
  }
}
