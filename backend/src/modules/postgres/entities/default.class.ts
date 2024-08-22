import { PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export abstract class BaseOrderItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;
}

export abstract class BaseProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}

export abstract class BaseOrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client: string;

  @Column()
  date: Date;
}
