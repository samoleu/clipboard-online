import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';

export class SingleVisualizationStrategy implements ExpirationStrategy {
  shouldExpire(clipboard: Clipboard): boolean {
    // Single visualization clips expire only after they have been accessed
    return clipboard.singleVisualization === true && clipboard.accessed === true;
  }

  async handleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
    // Delete the clipboard after it has been accessed
    await model.deleteOne({ code: clipboard.code });
  }

  getStrategyName(): string {
    return 'single-visualization';
  }

  getDescription(): string {
    return 'Clipboard is deleted after first access';
  }
} 