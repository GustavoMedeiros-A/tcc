import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { IOption } from '../interfaces/IOptions.interface';
import * as os from 'os';
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
import { AnalysisDTO } from '../dtos/analysis.dto';

@Injectable()
export class MongoDBService {
  private productModelName: string;
  constructor(
    @InjectModel('SmallOrder') private smallOrderModel: Model<Order>,
    @InjectModel('MediumOrder') private mediumOrderModel: Model<Order>,
  ) {}

  async executeQuery(options: IOption): Promise<AnalysisDTO> {
    const startCpuUsage = process.cpuUsage();
    const startMemoryUsage = process.memoryUsage();
    const startTime = Date.now();

    const orderModel = this.getOrderModel(options.dataSize);

    const query = orderModel.find();

    if (options.joinLookup) {
      query.populate({
        path: 'itens.product',
        model: this.productModelName,
      });
    }

    if (options.filter && options.filterDate) {
      query.where({ date: { $gte: options.filterDate } });
    }

    if (options.order) {
      query.sort({ date: options.orderType === 'ASC' ? 1 : -1 });
    }
    const results = await query.exec();

    if (results.length === 0) {
      throw new NotFoundException('Not found data to analyze');
    }

    const endTime = Date.now();
    const executionTime = endTime - startTime;

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

  private getOrderModel(dataSize: string): Model<Order> {
    switch (dataSize) {
      case 'small':
        this.productModelName = 'SmallProduct';
        return this.smallOrderModel;
      case 'medium':
        this.productModelName = 'MediumProduct';
        return this.mediumOrderModel;
      //   case 'large':
      //   this.productModelName = 'LargeProduct'
      //     return this.largeOrderModel;
      default:
        throw new Error('Invalid data size');
    }
  }
}
