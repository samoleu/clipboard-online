import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';
import { ExpirationStrategy } from './expiration-strategy.interface';

export class SingleVisualizationStrategy implements ExpirationStrategy {
  async onAccess(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
    setImmediate(async () => {
      await model.deleteOne({ code: clipboard.code });
    });
  }

  shouldDeleteAfterAccess(): boolean {
    return true;
  }
} 