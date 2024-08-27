import { Body, Controller, Post } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { IOption } from '../interfaces/IOptions.interface';

@Controller('postgres')
export class PostgresController {
  constructor(private readonly postgresService: PostgresService) {}

  @Post('execute')
  async execute(@Body() options: IOption) {
    return this.postgresService.executeQuery(options);
  }
}
