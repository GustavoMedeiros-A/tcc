import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { MongoSeederService } from './mongo-seeder.service';
import { PostgresSeederService } from './postgres-seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const mongoSeeder = app.get(MongoSeederService);
  const postgresSeeder = app.get(PostgresSeederService);

  console.log('Seeding MongoDB...');
  // await mongoSeeder.seedData('small');
  // await mongoSeeder.seedData('medium');
  // await mongoSeeder.seedData('large');

  //   console.log('Seeding PostgreSQL...');
  await postgresSeeder.seedData('small'); // Implementar similar ao MongoSeeder
  //   await postgresSeeder.seedData('medium');
  //   await postgresSeeder.seedData('large');

  await app.close();
}

bootstrap()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((err) => {
    console.error('Error during seeding', err);
    process.exit(1);
  });
