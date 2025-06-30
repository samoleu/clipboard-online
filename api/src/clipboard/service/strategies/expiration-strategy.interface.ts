import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';

export interface ExpirationStrategy {
  shouldExpire(clipboard: Clipboard): boolean;
  handleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<void>;
  getStrategyName(): string;
  getDescription(): string;
  shouldDeleteAfterAccess?(): boolean;
} 