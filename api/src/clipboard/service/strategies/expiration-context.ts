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

  getStrategyByName(name: string): ExpirationStrategy | undefined {
    return this.strategies.find(strategy => strategy.getStrategyName() === name);
  }
} 