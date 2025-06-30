import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';

export class TimeBasedExpirationStrategy implements ExpirationStrategy {
  shouldHandle(clipboard: Clipboard): boolean {
    return !clipboard.singleVisualization && clipboard.expiresAt !== undefined;
  }

  async onAccess(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
  }

  getStrategyName(): string {
    return 'time-based';
  }
} 