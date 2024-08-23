import { Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  BaseOrderEntity,
  BaseOrderItemEntity,
  BaseProductEntity,
} from './default.class';

@Entity({ name: 'small_product' })
export class SmallProduct extends BaseProductEntity {}

@Entity({ name: 'small_order' })
export class SmallOrder extends BaseOrderEntity {
  @OneToMany(() => SmallOrderItem, (orderItem) => orderItem.order)
  items: SmallOrderItem[];
}

@Entity({ name: 'small_order_item' })
export class SmallOrderItem extends BaseOrderItemEntity {
  @ManyToOne(() => SmallProduct)
  product: SmallProduct;

  @ManyToOne(() => SmallOrder, (order) => order.items)
  order: SmallOrder;
}
