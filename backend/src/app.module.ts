import { Module } from '@nestjs/common';

// import { PostgresModule } from './postgres/postgres.module';
import { MongoDBModule } from './modules/mongodb/mongodb.module';

@Module({
  imports: [MongoDBModule],
})
export class AppModule {}
