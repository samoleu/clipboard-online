import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';

export class SingleVisualizationStrategy implements ExpirationStrategy {
  shouldHandle(clipboard: Clipboard): boolean {
    return clipboard.singleVisualization === true;
  }

  async onAccess(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
    setImmediate(async () => {
      await model.deleteOne({ code: clipboard.code });
    });
  }

  getStrategyName(): string {
    return 'single-visualization';
  }

  shouldDeleteAfterAccess(): boolean {
    return true;
  }
} 