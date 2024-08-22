// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from '../modules/postgres/entities/order.entity';
// import { OrderItem } from '../modules/postgres/entities/order-item.entity';
// import { Product } from '../modules/postgres/entities/product.entity';

// @Injectable()
// export class PostgresSeederService {
//   constructor(
//     @InjectRepository(Order, 'small')
//     private smallOrderRepository: Repository<Order>,
//     @InjectRepository(OrderItem, 'small')
//     private smallOrderItemRepository: Repository<OrderItem>,
//     @InjectRepository(Product, 'small')

//   ) {}

//   async seedData(size: 'small' | 'medium' | 'large') {
//     if (size === 'small') {
//       await this.seedSmallData();
//     } else if (size === 'medium') {
//       await this.seedMediumData();
//     } else if (size === 'large') {
//       await this.seedLargeData();
//     }
//   }

//   private async seedSmallData() {
//     await this.generateData(
//       this.smallOrderRepository,
//       this.smallProductRepository,
//       this.smallOrderItemRepository,
//       100000,
//     );
//   }

//   private async seedMediumData() {
//     await this.generateData(
//       this.mediumOrderRepository,
//       this.mediumProductRepository,
//       this.mediumOrderItemRepository,
//       1000000,
//     );
//   }

//   private async seedLargeData() {
//     await this.generateData(
//       this.largeOrderRepository,
//       this.largeProductRepository,
//       this.largeOrderItemRepository,
//       5000000,
//     );
//   }

//   private async generateData(
//     orderRepository: Repository<Order>,
//     productRepository: Repository<Product>,
//     orderItemRepository: Repository<OrderItem>,
//     recordCount: number,
//   ) {
//     await orderRepository.clear();
//     await productRepository.clear();
//     await orderItemRepository.clear();

//     const products = [];
//     for (let i = 0; i < 1000; i++) {
//       const product = productRepository.create({
//         name: `Product ${i + 1}`,
//         price: Math.floor(Math.random() * 1000) + 1,
//       });
//       await productRepository.save(product);
//       products.push(product);
//     }

//     for (let i = 0; i < recordCount; i++) {
//       const orderItems = [];
//       const itemCount = Math.floor(Math.random() * 10) + 1;

//       for (let j = 0; j < itemCount; j++) {
//         const orderItem = orderItemRepository.create({
//           product: products[Math.floor(Math.random() * products.length)],
//           quantity: Math.floor(Math.random() * 10) + 1,
//         });
//         await orderItemRepository.save(orderItem);
//         orderItems.push(orderItem);
//       }

//       const order = orderRepository.create({
//         client: `Client ${i + 1}`,
//         date: new Date(
//           2024,
//           Math.floor(Math.random() * 12),
//           Math.floor(Math.random() * 28) + 1,
//         ),
//         items: orderItems,
//       });
//       await orderRepository.save(order);
//     }
//   }
// }
