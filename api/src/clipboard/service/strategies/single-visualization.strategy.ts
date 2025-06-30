import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';

export class SingleVisualizationStrategy implements ExpirationStrategy {
  shouldExpire(clipboard: Clipboard): boolean {
    return clipboard.singleVisualization === true;
  }

  async handleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
    await model.deleteOne({ code: clipboard.code });
  }

  getStrategyName(): string {
    return 'single-visualization';
  }

  getDescription(): string {
    return 'Clipboard is deleted immediately after first access';
  }

  shouldDeleteAfterAccess(): boolean {
    return true;
  }
} 