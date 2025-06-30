import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClipboardDTO } from '../dto/clipboard.dto';
import { Clipboard } from '../model/clipboard.model';
import { AccessCodeGeneratorSingleton } from './access-code-generator';
import { ExpirationContext } from './strategies/expiration-context';
import { ExpirationTimeParser } from './utils/expiration-time-parser';

@Injectable()
export class ClipboardService {
  constructor(
    @InjectModel('Clipboard')
    private readonly clipboard: Model<Clipboard>,
    @Inject('ACCESS_CODE_GENERATOR')
    private readonly accessCodeGenerator: AccessCodeGeneratorSingleton,
    private readonly expirationContext: ExpirationContext,
  ) {}

  async findOne(code: string): Promise<Clipboard | null> {
    const query = await this.clipboard.findOne({ code: code });
    if (!query) return null;

    const strategy = this.expirationContext.getStrategyFor(query);
    await strategy.onAccess(query, this.clipboard);

    return query;
  }

  async create(clipboardDTO: ClipboardDTO) {
    clipboardDTO.code = this.accessCodeGenerator.generate();
    clipboardDTO.createdAt = new Date();

    if (!clipboardDTO.singleVisualization) {
      const expirationTimeMs = ExpirationTimeParser.parse(clipboardDTO.expirationTime || '1h');
      clipboardDTO.expiresAt = new Date(Date.now() + expirationTimeMs);
    }

    const clipboardInstance = new this.clipboard(clipboardDTO);
    const query = await clipboardInstance.save();
    return query;
  }
}