import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class OrderItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop()
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
