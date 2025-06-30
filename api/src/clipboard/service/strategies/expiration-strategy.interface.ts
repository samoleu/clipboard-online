import { Model } from 'mongoose';
import { Clipboard } from '../../model/clipboard.model';

export interface ExpirationStrategy {
  onAccess(clipboard: Clipboard, model: Model<Clipboard>): Promise<void>;
  shouldHandle(clipboard: Clipboard): boolean;
} 