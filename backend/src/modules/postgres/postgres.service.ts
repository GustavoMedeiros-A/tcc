import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmallOrder } from './entities/small.entities';
import { MediumOrder } from './entities/medium.entities';
import { IOption } from '../../interfaces/IOptions.interface';
import * as os from 'os';
import { AnalysisDTO } from '../../dtos/analysis.dto';
import {
  calculateCpuPercent,
  calculateTotalCpuUsage,
  calculateTotalCpuUsageMs,
  calculateTotalCpuUsageSeconds,
  calculateTotalMemoryUsage,
  calculateTotalMemoryUsagepercent,
  convertBytesToGigabytes,
  toFixedAndParseFloat,
} from '../utils';

@Injectable()
export class PostgresService {
  constructor(
    @InjectRepository(SmallOrder)
    private smallOrderRepository: Repository<SmallOrder>,
    @InjectRepository(MediumOrder)
    private mediumOrderRepository: Repository<MediumOrder>,
  ) {}

  async executeQuery(options: IOption): Promise<AnalysisDTO> {
    const startCpuUsage = process.cpuUsage();
    console.log('startCpuUsage', startCpuUsage);
    const startMemoryUsage = process.memoryUsage();
    const startTime = Date.now();

    const { orderRepository } = this.getRepositories(options.dataSize);

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

    console.log('Execution time: ' + executionTime);

    const endCpuUsage = process.cpuUsage(startCpuUsage);
    const endMemoryUsage = process.memoryUsage();

    const totalCpuUsage = calculateTotalCpuUsage(
      endCpuUsage.user,
      endCpuUsage.system,
      startCpuUsage.user,
      startCpuUsage.system,
    );
    const cpuUsagePercent = calculateCpuPercent(totalCpuUsage, executionTime);
    const totalCpuUsageMs = calculateTotalCpuUsageMs(totalCpuUsage);
    const totalCpuUsageSeconds = calculateTotalCpuUsageSeconds(totalCpuUsage);

    const totalSystemMemory = os.totalmem();
    const freeSystemMemory = os.freemem();

    const totalMemoryUsage = calculateTotalMemoryUsage(
      endMemoryUsage.heapUsed,
      startMemoryUsage.heapUsed,
    );
    const memoryUsagePercent = calculateTotalMemoryUsagepercent(
      totalMemoryUsage,
      totalSystemMemory,
    );

    return {
      cpuUsage: {
        total: toFixedAndParseFloat(totalCpuUsage),
        totalMs: toFixedAndParseFloat(totalCpuUsageMs),
        totalSeconds: toFixedAndParseFloat(totalCpuUsageSeconds),
        percent: toFixedAndParseFloat(cpuUsagePercent),
      },
      memoryUsage: {
        totalUsed: toFixedAndParseFloat(totalMemoryUsage / (1024 * 1024)),
        percentUsed: toFixedAndParseFloat(memoryUsagePercent),
        totalSystemMemory: convertBytesToGigabytes(totalSystemMemory),
        freeSystemMemory: convertBytesToGigabytes(freeSystemMemory),
      },
      executionTime: executionTime / 1000,
    };
  }

  private getRepositories(dataSize: string) {
    switch (dataSize) {
      case 'small':
        return {
          orderRepository: this.smallOrderRepository,
        };
      case 'medium':
        return {
          orderRepository: this.mediumOrderRepository,
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
