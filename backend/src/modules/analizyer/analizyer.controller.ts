import { Controller, Post, Body } from '@nestjs/common';
import { PostgresService } from '../postgres/postgres.service';
import { MongoDBService } from '../mongodb/mongodb.service';
import { IOption } from 'src/interfaces/IOptions.interface';

@Controller('analizyer')
export class AnalizyerController {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly mongoDBService: MongoDBService,
  ) {}

  @Post('execute')
  async executeQuery(@Body() options: IOption) {
    const postgresData = await this.postgresService.executeQuery(options);
    const mongoData = await this.mongoDBService.executeQuery(options);

    return { postgresData, mongoData };
  }
}
