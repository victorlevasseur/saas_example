import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { VerifySession } from 'supertokens-nestjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @VerifySession()
  getData() {
    return this.appService.getData();
  }
}
