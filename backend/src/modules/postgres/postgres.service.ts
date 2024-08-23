import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  SmallOrder,
  SmallOrderItem,
  SmallProduct,
} from './entities/small.entities';
import {
  MediumOrder,
  MediumOrderItem,
  MediumProduct,
} from './entities/medium.entities';
import { IOption } from '../interfaces/IOptions.interface';
import * as os from 'os';
import { AnalysisDTO } from '../dtos/analysis.dto';

@Injectable()
export class PostgresService {
  constructor(
    @InjectRepository(SmallOrder)
    private smallOrderRepository: Repository<SmallOrder>,
    @InjectRepository(SmallOrderItem)
    private smallOrderItemRepository: Repository<SmallOrderItem>,
    @InjectRepository(SmallProduct)
    private smallProductRepository: Repository<SmallProduct>,
    @InjectRepository(MediumOrder)
    private mediumOrderRepository: Repository<MediumOrder>,
    @InjectRepository(MediumOrderItem)
    private mediumOrderItemRepository: Repository<MediumOrderItem>,
    @InjectRepository(MediumProduct)
    private mediumProductRepository: Repository<MediumProduct>,
  ) {}

  async executeQuery(options: IOption): Promise<AnalysisDTO> {
    const startCpuUsage = process.cpuUsage();
    const startMemoryUsage = process.memoryUsage();
    const startTime = Date.now();
    console.time('Query Execution Time');

    const { orderRepository, productRepository, orderItemRepository } =
      this.getRepositories(options.dataSize);

    const query = orderRepository.createQueryBuilder('order');
    query.innerJoinAndSelect('order.items', 'orderItem');

    if (options.joinLookup) {
      query.innerJoinAndSelect('orderItem.product', 'product');
    }
    if (options.filter && options.filterDate) {
      query.where('order.date >= :filterDate', {
        filterDate: options.filterDate,
      });
    }

    if (options.order) {
      query.orderBy('order.date', options.orderType);
    }

    // TODO: think abount index
    const results = await query.getMany();

    if (results.length == 0) {
      throw new NotFoundException('Not found data to analyze');
    }

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    const endCpuUsage = process.cpuUsage(startCpuUsage);
    const endMemoryUsage = process.memoryUsage();
    const numberOfCores = os.cpus().length;
    const totalCpuUsage = Math.abs(
      endCpuUsage.user +
        endCpuUsage.system -
        (startCpuUsage.user + startCpuUsage.system),
    );
    const cpuUsagePercent =
      (totalCpuUsage / (executionTime * 1000 * numberOfCores)) * 100;

    const totalCpuUsageMs = totalCpuUsage / 1000;
    const totalCpuUsageSeconds = totalCpuUsage / 1000000;

    const totalMemoryUsage = Math.abs(
      endMemoryUsage.heapUsed - startMemoryUsage.heapUsed,
    );
    const totalSystemMemory = os.totalmem();
    const freeSystemMemory = os.freemem();

    const memoryUsagePercent = (totalMemoryUsage / totalSystemMemory) * 100;

    return {
      cpuUsage: {
        total: this.toFixedAndParseFloat(totalCpuUsage),
        totalMs: this.toFixedAndParseFloat(totalCpuUsageMs),
        totalSeconds: this.toFixedAndParseFloat(totalCpuUsageSeconds),
        percent: this.toFixedAndParseFloat(cpuUsagePercent),
      },
      memoryUsage: {
        totalUsed: this.toFixedAndParseFloat(totalMemoryUsage / (1024 * 1024)),
        percentUsed: this.toFixedAndParseFloat(memoryUsagePercent),
        totalSystemMemory: this.convertBytesToGigabytes(totalSystemMemory),
        freeSystemMemory: this.convertBytesToGigabytes(freeSystemMemory),
      },
      executionTime: executionTime,
    };
  }

  private toFixedAndParseFloat(value: number) {
    return parseFloat(value.toFixed(2));
  }

  private convertBytesToGigabytes(number: number) {
    return this.toFixedAndParseFloat(number / (1024 * 1024 * 1024));
  }

  private getRepositories(dataSize: string) {
    switch (dataSize) {
      case 'small':
        return {
          orderRepository: this.smallOrderRepository,
          productRepository: this.smallProductRepository,
          orderItemRepository: this.smallOrderItemRepository,
        };
      case 'medium':
        return {
          orderRepository: this.mediumOrderRepository,
          productRepository: this.mediumProductRepository,
          orderItemRepository: this.mediumOrderItemRepository,
        };
      //   case 'large':
      //     return {
      //       orderRepository: this.largeOrderRepository,
      //       productRepository: this.largeProductRepository,
      //       orderItemRepository: this.largeOrderItemRepository,
      //     };
      default:
        throw new Error('Invalid data size');
    }
  }
}
