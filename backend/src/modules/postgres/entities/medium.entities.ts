import { Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  BaseOrderEntity,
  BaseOrderItemEntity,
  BaseProductEntity,
} from './default.class';

@Entity({ name: 'medium_product' })
export class MediumProduct extends BaseProductEntity {}

@Entity({ name: 'medium_order' })
export class MediumOrder extends BaseOrderEntity {
  @OneToMany(() => MediumOrderItem, (orderItem) => orderItem.order)
  items: MediumOrderItem[];
}

@Entity({ name: 'medium_order_item' })
export class MediumOrderItem extends BaseOrderItemEntity {
  @ManyToOne(() => MediumProduct)
  product: MediumProduct;

  @ManyToOne(() => MediumOrder, (order) => order.items)
  order: MediumOrder;
}
