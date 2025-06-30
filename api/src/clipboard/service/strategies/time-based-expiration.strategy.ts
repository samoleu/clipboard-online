import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';
import { ONE_HOUR_IN_MILLISECONDS } from '../const';

export class TimeBasedExpirationStrategy implements ExpirationStrategy {
  shouldExpire(clipboard: Clipboard): boolean {
    // Check if the clipboard has exceeded the time limit
    if (!clipboard.createdAt) return false;
    
    const currentTime = new Date().getTime();
    const creationTime = clipboard.createdAt.getTime();
    const timeDifference = currentTime - creationTime;
    
    return timeDifference >= ONE_HOUR_IN_MILLISECONDS;
  }

  async handleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
    // Delete the expired clipboard
    await model.deleteOne({ code: clipboard.code });
  }

  getStrategyName(): string {
    return 'time-based';
  }

  getDescription(): string {
    return 'Clipboard expires after 1 hour from creation';
  }
} 