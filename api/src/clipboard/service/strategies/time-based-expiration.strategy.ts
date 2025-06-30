import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';

export class TimeBasedExpirationStrategy implements ExpirationStrategy {
  async onAccess(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
    return Promise.resolve();
  }
} 