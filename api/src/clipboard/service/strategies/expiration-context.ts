import { Injectable } from '@nestjs/common';
import { ExpirationStrategy } from './expiration-strategy.interface';
import { SingleVisualizationStrategy } from './single-visualization.strategy';
import { TimeBasedExpirationStrategy } from './time-based-expiration.strategy';

@Injectable()
export class ExpirationContext {
  private strategies: ExpirationStrategy[];

  constructor() {
    this.strategies = [
      new SingleVisualizationStrategy(),
      new TimeBasedExpirationStrategy(),
    ];
  }

  getAllStrategies(): ExpirationStrategy[] {
    return this.strategies;
  }
} 