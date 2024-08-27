import { Body, Controller, Post } from '@nestjs/common';
import { IOption } from '../interfaces/IOptions.interface';
import { MongoDBService } from './mongodb.service';

@Controller('mongodb')
export class MongoDBController {
  constructor(private readonly mongoDBService: MongoDBService) {}

  @Post('execute')
  async execute(@Body() options: IOption) {
    return this.mongoDBService.executeQuery(options);
  }
}
