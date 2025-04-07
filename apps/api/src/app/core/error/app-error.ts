import { HttpException } from '@nestjs/common';

export interface AppError {
  type: string;
  createHttpException(): HttpException;
}
