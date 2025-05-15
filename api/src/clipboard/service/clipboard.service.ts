import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { ClipboardDTO } from '../dto/clipboard.dto';
import { Clipboard } from '../model/clipboard.model';
import { ALPHABET_WITH_NUMBERS, ONE_HOUR_IN_MILLISECONDS } from './const';

const nanoid = customAlphabet(ALPHABET_WITH_NUMBERS, 6);

@Injectable()
export class ClipboardService {
  constructor(
    @InjectModel('Clipboard')
    private readonly clipboard: Model<Clipboard>,
  ) {}

  async findOne(code: string): Promise<Clipboard | null> {
    const query = await this.clipboard.findOne({ code: code });

    if (!query) return null;

    if (query.singleVisualization) {
      await this.clipboard.deleteOne({ code: code });
    }

    if (
      query.createdAt &&
      new Date().getTime() - query.createdAt.getTime() >=
        ONE_HOUR_IN_MILLISECONDS
    ) {
      await this.clipboard.deleteOne({ code: code });
      return null;
    }

    return query;
  }

  async create(clipboardDTO: ClipboardDTO) {
    clipboardDTO.code = nanoid();
    clipboardDTO.createdAt = new Date();

    const clipboardInstance = new this.clipboard(clipboardDTO);
    const query = await clipboardInstance.save();
    return query;
  }
}
