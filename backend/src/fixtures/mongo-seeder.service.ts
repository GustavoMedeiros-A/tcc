// mongo-seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../modules/mongodb/schemas/order.schema';
import { Product } from '../modules/mongodb/schemas/product.schema';

@Injectable()
export class MongoSeederService {
  constructor(
    @InjectModel('SmallOrder') private smallOrderModel: Model<Order>,
    @InjectModel('SmallProduct') private smallProductModel: Model<Product>,
    @InjectModel('MediumOrder') private mediumOrderModel: Model<Order>,
    @InjectModel('MediumProduct') private mediumProductModel: Model<Product>,
    @InjectModel('LargeOrder') private largeOrderModel: Model<Order>,
    @InjectModel('LargeProduct') private largeProductModel: Model<Product>,
  ) {}

  async seedData(size: 'small' | 'medium' | 'large') {
    if (size === 'small') {
      await this.seedSmallData();
    } else if (size === 'medium') {
      await this.seedMediumData();
    } else if (size === 'large') {
      await this.seedLargeData();
    }
  }

  private async seedSmallData() {
    await this.generateData(
      this.smallOrderModel,
      this.smallProductModel,
      100000,
    );
  }

  private async seedMediumData() {
    await this.generateData(
      this.mediumOrderModel,
      this.mediumProductModel,
      1000000,
    );
  }

  private async seedLargeData() {
    await this.generateData(
      this.largeOrderModel,
      this.largeProductModel,
      5000000,
    );
  }

  private async generateData(
    orderModel: Model<Order>,
    productModel: Model<Product>,
    recordCount: number,
  ) {
    await orderModel.deleteMany({});
    await productModel.deleteMany({});
    const products = [];
    for (let i = 0; i < 1000; i++) {
      const product = new productModel({
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 1000) + 1,
      });
      await product.save();
      products.push(product._id);
    }
    for (let i = 0; i < recordCount; i++) {
      const orderItems = [];
      const itemCount = Math.floor(Math.random() * 10) + 1;

      for (let j = 0; j < itemCount; j++) {
        orderItems.push({
          product: products[Math.floor(Math.random() * products.length)],
          quantity: this.get2024RandomDate(),
        });
      }

      const order = new orderModel({
        client: `Client ${i + 1}`,
        itens: orderItems,
      });
      await order.save();
    }
  }

  private get2024RandomDate(): Date {
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 11, 31);
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }
}
