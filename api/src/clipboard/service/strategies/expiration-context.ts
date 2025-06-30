import { Injectable } from '@nestjs/common';
import { ExpirationStrategy } from './expiration-strategy.interface';
import { SingleVisualizationStrategy } from './single-visualization.strategy';
import { TimeBasedExpirationStrategy } from './time-based-expiration.strategy';
import { Clipboard } from '../../model/clipboard.model';

@Injectable()
export class ExpirationContext {
  private singleVisualizationStrategy = new SingleVisualizationStrategy();
  private timeBasedExpirationStrategy = new TimeBasedExpirationStrategy();

  getStrategyFor(clipboard: Clipboard): ExpirationStrategy {
    if (clipboard.singleVisualization) {
      return this.singleVisualizationStrategy;
    }
    if (clipboard.expiresAt) {
      return this.timeBasedExpirationStrategy;
    }
    throw new Error('No expiration strategy found for clipboard');
  }
} 