import { BadRequestException, HttpException } from '@nestjs/common';
import { AppError } from '../../../core/error/app-error';

export interface CreateCustomerError extends AppError {
  type: 'CreateCustomerError';
}

export class CreateCustomerExistingNameError implements CreateCustomerError {
  type: 'CreateCustomerError';

  constructor(private name: string) {}

  createHttpException(): HttpException {
    throw new BadRequestException({
      statusCode: 400,
      code: 400001,
      description: `Customer with name ${this.name} already exists!`,
    });
  }
}

