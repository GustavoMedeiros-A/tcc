import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';
import { Document } from 'mongoose';
@Schema()
export class Order extends Document {
  @Prop()
  client: string;

  @Prop({ type: [OrderItemSchema] })
  itens: OrderItem[];

  @Prop({ type: Date, default: Date.now })
  date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
