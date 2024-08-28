import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  SmallOrder,
  SmallOrderItem,
  SmallProduct,
} from './entities/small.entities';
import {
  MediumOrder,
  MediumOrderItem,
  MediumProduct,
} from './entities/medium.entities';
import { PostgresSeederService } from 'src/fixtures/postgres-seeder.service';
import { PostgresService } from './postgres.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: 'admin',
      database: 'comparation',
      synchronize: true,
      logging: true,
      entities: [
        SmallOrder,
        SmallOrderItem,
        SmallProduct,
        MediumOrder,
        MediumOrderItem,
        MediumProduct,
      ],
    }),
    TypeOrmModule.forFeature([
      SmallOrder,
      SmallOrderItem,
      SmallProduct,
      MediumOrder,
      MediumOrderItem,
      MediumProduct,
    ]),
  ],
  providers: [PostgresSeederService, PostgresService],
  controllers: [],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
