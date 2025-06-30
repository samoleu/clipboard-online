import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClipboardDTO } from '../dto/clipboard.dto';
import { Clipboard } from '../model/clipboard.model';
import { AccessCodeGeneratorSingleton } from './access-code-generator';
import { ExpirationContext } from './strategies/expiration-context';

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

    // Mark single visualization clipboards as accessed
    if (query.singleVisualization && !query.accessed) {
      await this.clipboard.updateOne(
        { code: code },
        { accessed: true }
      );
      query.accessed = true;
    }

    // Use expiration strategy to check and handle expiration
    const wasExpired = await this.expirationContext.checkAndHandleExpiration(query, this.clipboard);
    
    if (wasExpired) {
      return null;
    }

    return query;
  }

  async create(clipboardDTO: ClipboardDTO) {
    clipboardDTO.code = this.accessCodeGenerator.generate();
    clipboardDTO.createdAt = new Date();
    clipboardDTO.accessed = false; // Ensure new clipboards start as not accessed

    const clipboardInstance = new this.clipboard(clipboardDTO);
    const query = await clipboardInstance.save();
    return query;
  }
}