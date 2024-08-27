// mongodb.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { ProductSchema } from './schemas/product.schema';
import { OrderItemSchema } from './schemas/order-item.schema';
import { MongoSeederService } from 'src/fixtures/mongo-seeder.service';
import { MongoDBService } from './mongodb.service';
import { MongoDBController } from './mongodb.controller';

const createMongooseFeatures = (
  namePrefix: string,
  collectionPrefix: string,
) => {
  return [
    {
      name: `${namePrefix}Order`,
      schema: OrderSchema,
      collection: `${collectionPrefix}Orders`,
    },
    {
      name: `${namePrefix}Product`,
      schema: ProductSchema,
      collection: `${collectionPrefix}Products`,
    },
  ];
};

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017', {
      dbName: 'tcc-comparation',
    }),
    MongooseModule.forFeature([
      ...createMongooseFeatures('Small', 'small'),
      ...createMongooseFeatures('Medium', 'medium'),
      ...createMongooseFeatures('Large', 'large'),
    ]),
  ],
  providers: [MongoSeederService, MongoDBService],
  controllers: [MongoDBController],
})
export class MongoDBModule {}
