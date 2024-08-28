import { Module } from '@nestjs/common';

// import { PostgresModule } from './postgres/postgres.module';
import { MongoDBModule } from './modules/mongodb/mongodb.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { AnalizyerModule } from './modules/analizyer/analizyer.module';

@Module({
  imports: [MongoDBModule, PostgresModule, AnalizyerModule],
})
export class AppModule {}
