import { HttpException, NotFoundException } from '@nestjs/common';
import { AppError } from '../../../core/error/app-error';

export interface FindUserError extends AppError {
  type: 'FindUserError';
}

export class FindUserNotFoundByEmailError implements FindUserError {
  type: 'FindUserError';

  constructor(private email: string) {
  }

  createHttpException(): HttpException {
    throw new NotFoundException({
      statusCode: 404,
      code: 404102,
      description: `User with email ${this.email} not found!`,
    });
  }
}

export class FindUserNotFoundByIdError implements FindUserError {
  type: 'FindUserError';

  constructor(private id: string) {
  }

  createHttpException(): HttpException {
    throw new NotFoundException({
      statusCode: 404,
      code: 404103,
      description: `User with id ${this.id} not found!`,
    });
  }
}
