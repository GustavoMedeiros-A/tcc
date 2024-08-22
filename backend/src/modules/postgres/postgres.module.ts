import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmEntities } from './createTypeOrmEntities';
// import { PostgresSeederService } from 'src/fixtures/postgres-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'tcc-comparation',
      synchronize: true,
      entities: [
        ...createTypeOrmEntities('small'),
        ...createTypeOrmEntities('medium'),
        ...createTypeOrmEntities('large'),
      ],
    }),
    TypeOrmModule.forFeature(createTypeOrmEntities('small'), 'smallDS'),
    TypeOrmModule.forFeature(createTypeOrmEntities('medium'), 'mediumDS'),
    TypeOrmModule.forFeature(createTypeOrmEntities('large'), 'largeDS'),
  ],
  // providers: [PostgresSeederService],
  // exports: [PostgresSeederService],
})
export class PostgresModule {}
