import { Module } from '@nestjs/common';
import { AnalizyerController } from './analizyer.controller';
import { PostgresModule } from '../postgres/postgres.module';
import { MongoDBModule } from '../mongodb/mongodb.module';
import { PostgresService } from '../postgres/postgres.service';
import { MongoDBService } from '../mongodb/mongodb.service';

@Module({
  imports: [PostgresModule, MongoDBModule],
  controllers: [AnalizyerController],
  providers: [PostgresService, MongoDBService],
})
export class AnalizyerModule {}
