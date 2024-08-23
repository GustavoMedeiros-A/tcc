import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MediumOrder,
  MediumOrderItem,
  MediumProduct,
} from 'src/modules/postgres/entities/medium.entities';
import {
  SmallOrder,
  SmallOrderItem,
  SmallProduct,
} from 'src/modules/postgres/entities/small.entities';
import { Repository } from 'typeorm';
import { get2024RandomDate, getRandomQuantity } from './utils';

@Injectable()
export class PostgresSeederService {
  constructor(
    @InjectRepository(SmallOrder)
    private smallOrderRepository: Repository<SmallOrder>,
    @InjectRepository(SmallProduct)
    private smallProductRepository: Repository<SmallProduct>,
    @InjectRepository(SmallOrderItem)
    private smallOrderItemRepository: Repository<SmallOrderItem>,
    @InjectRepository(MediumOrder)
    private mediumOrderRepository: Repository<MediumOrder>,
    @InjectRepository(MediumProduct)
    private mediumProductRepository: Repository<MediumProduct>,
    // @InjectRepository(LargeOrder)
    // private largeOrderRepository: Repository<LargeOrder>,
    // @InjectRepository(LargeProduct)
    // private largeProductRepository: Repository<LargeProduct>,
    @InjectRepository(MediumOrderItem)
    private mediumOrderItemRepository: Repository<MediumOrderItem>,
    // @InjectRepository(LargeOrderItem)
    // private largeOrderItemRepository: Repository<LargeOrderItem>,
  ) {}

  async seedData(size: 'small' | 'medium' | 'large') {
    if (size === 'small') {
      await this.seedSmallData();
    } else if (size === 'medium') {
      await this.seedMediumData();
    }
    // else if (size === 'large') {
    //   await this.seedLargeData();
    // }
  }

  private async seedSmallData() {
    await this.generateData(
      this.smallOrderRepository,
      this.smallProductRepository,
      this.smallOrderItemRepository,
      100000,
    );
  }

  private async seedMediumData() {
    await this.generateData(
      this.mediumOrderRepository,
      this.mediumProductRepository,
      this.mediumOrderItemRepository,
      1000000,
    );
  }

  //   private async seedLargeData() {
  //     await this.generateData(
  //       this.largeOrderRepository,
  //       this.largeProductRepository,
  //       this.largeOrderItemRepository,
  //       5000000,
  //     );
  //   }

  private async truncateTables(
    orderRepository: Repository<any>,
    productRepository: Repository<any>,
    orderItemRepository: Repository<any>,
  ) {
    const queryRunner = orderRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      await queryRunner.query(
        `TRUNCATE TABLE "${orderItemRepository.metadata.tableName}" CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "${orderRepository.metadata.tableName}" CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "${productRepository.metadata.tableName}" CASCADE`,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async generateData(
    orderRepository: Repository<any>,
    productRepository: Repository<any>,
    orderItemRepository: Repository<any>,
    recordCount: number,
  ) {
    await this.truncateTables(
      orderRepository,
      productRepository,
      orderItemRepository,
    );

    const products = [];
    const productCount = Math.floor(recordCount * 0.1);
    for (let i = 0; i < productCount; i++) {
      const product = productRepository.create({
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 1000) + 1,
      });
      await productRepository.save(product);
      products.push(product);
    }

    for (let i = 0; i < recordCount; i++) {
      const orderItems = [];
      const itemCount = Math.floor(Math.random() * 10) + 1;

      for (let j = 0; j < itemCount; j++) {
        const orderItem = orderItemRepository.create({
          product: products[Math.floor(Math.random() * products.length)],
          quantity: getRandomQuantity(),
        });
        await orderItemRepository.save(orderItem);
        orderItems.push(orderItem);
      }

      const order = orderRepository.create({
        client: `Client ${i + 1}`,
        items: orderItems,
        date: get2024RandomDate(),
      });
      await orderRepository.save(order);
    }
  }
}
