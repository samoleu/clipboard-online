import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
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

  async checkAndHandleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<boolean> {
    // Find the appropriate strategy for this clipboard
    const strategy = this.selectStrategy(clipboard);
    
    if (strategy.shouldExpire(clipboard)) {
      await strategy.handleExpiration(clipboard, model);
      return true; // Clipboard was expired
    }
    
    return false; // Clipboard was not expired
  }

  private selectStrategy(clipboard: Clipboard): ExpirationStrategy {
    // Priority: Single visualization takes precedence over time-based
    for (const strategy of this.strategies) {
      if (strategy.shouldExpire(clipboard)) {
        return strategy;
      }
    }
    
    // Return the first strategy as fallback (shouldn't happen in normal flow)
    return this.strategies[0];
  }

  getAvailableStrategies(): Array<{ name: string; description: string }> {
    return this.strategies.map(strategy => ({
      name: strategy.getStrategyName(),
      description: strategy.getDescription(),
    }));
  }

  getStrategyByName(name: string): ExpirationStrategy | undefined {
    return this.strategies.find(strategy => strategy.getStrategyName() === name);
  }
} 