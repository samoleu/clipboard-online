import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { ALPHABET_WITH_NUMBERS, ONE_HOUR_IN_MILLISECONDS } from './const';
import { Clipboard } from '../model/clipboard.model';
import { ClipboardDTO } from '../dto/clipboard.dto';

const nanoid = customAlphabet(ALPHABET_WITH_NUMBERS, 6);

@Injectable()
export class ClipboardService {
  constructor(
    @Inject('CLIPBOARD_REPOSITORY')
    private readonly clipboard: Repository<Clipboard>,
  ) {}

  async findOne(code: string): Promise<Clipboard | null> {
    const query = await this.clipboard.findOne({ where: { code: code } });

    if (!query) return null;

    if (query.singleVisualization) await this.clipboard.delete({ code: code });

    if (
      query.createdAt &&
      new Date().getTime() - query.createdAt.getTime() >=
        ONE_HOUR_IN_MILLISECONDS
    ) {
      await this.clipboard.delete({ code: code });
      return null;
    }

    return query;
  }

  async create(clipboardDTO: ClipboardDTO) {
    clipboardDTO.code = nanoid();
    clipboardDTO.createdAt = new Date();

    const query = await this.clipboard.save(clipboardDTO);
    return query;
  }
}
