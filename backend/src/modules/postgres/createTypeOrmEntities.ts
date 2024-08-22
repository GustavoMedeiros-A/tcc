import { EntitySchema } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { OrderItem } from './entities/order-item.entity';

export function createTypeOrmEntities(prefix: string): EntitySchema[] {
  const orderEntity = new EntitySchema<Order>({
    name: `${prefix}Order`,
    tableName: `${prefix}_orders`,
    columns: {
      id: {
        type: Number,
        primary: true,
        generated: 'increment',
      },
      client: {
        type: String,
      },
      date: {
        type: 'date',
      },
    },
    relations: {
      items: {
        type: 'one-to-many',
        target: OrderItem,
        inverseSide: 'order',
        cascade: true,
      },
    },
  });

  const productEntity = new EntitySchema<Product>({
    name: `${prefix}Product`,
    tableName: `${prefix}_products`,
    columns: {
      id: {
        type: Number,
        primary: true,
        generated: 'increment',
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  });

  const orderItemEntity = new EntitySchema<OrderItem>({
    name: `${prefix}OrderItem`,
    tableName: `${prefix}_order_items`,
    columns: {
      id: {
        type: Number,
        primary: true,
        generated: 'increment',
      },
      quantity: {
        type: Number,
      },
    },
    relations: {
      product: {
        type: 'many-to-one',
        target: Product,
        joinColumn: { name: 'productId' },
      },
      order: {
        type: 'many-to-one',
        target: Order,
        joinColumn: { name: 'orderId' },
        inverseSide: 'items',
      },
    },
  });

  return [orderEntity, productEntity, orderItemEntity];
}
