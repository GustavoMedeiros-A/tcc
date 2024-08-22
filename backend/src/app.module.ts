import { Module } from '@nestjs/common';

// import { PostgresModule } from './postgres/postgres.module';
import { MongoDBModule } from './modules/mongodb/mongodb.module';
import { PostgresModule } from './modules/postgres/postgres.module';

@Module({
  imports: [MongoDBModule, PostgresModule],
})
export class AppModule {}
