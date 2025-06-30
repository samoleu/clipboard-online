import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';

export class TimeBasedExpirationStrategy implements ExpirationStrategy {
  shouldExpire(clipboard: Clipboard): boolean {
    return !clipboard.singleVisualization && clipboard.expiresAt !== undefined;
  }

  async handleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
  }

  getStrategyName(): string {
    return 'time-based';
  }

  getDescription(): string {
    return 'Clipboard expires after specified time from creation (using MongoDB TTL)';
  }
} 