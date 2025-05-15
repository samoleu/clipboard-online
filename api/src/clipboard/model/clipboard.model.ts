import mongoose from 'mongoose';

export const ClipboardSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  singleVisualization: {
    type: Boolean,
    default: false,
  },
});

export interface Clipboard {
  _id: string;
  code: string;
  content: string;
  createdAt?: Date;
  singleVisualization: boolean;
}
