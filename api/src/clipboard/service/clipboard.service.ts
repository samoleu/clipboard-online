import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClipboardDTO } from '../dto/clipboard.dto';
import { Clipboard } from '../model/clipboard.model';
import { ONE_HOUR_IN_MILLISECONDS } from './const';
import { AccessCodeGeneratorSingleton } from './access-code-generator';

@Injectable()
export class ClipboardService {
  constructor(
    @InjectModel('Clipboard')
    private readonly clipboard: Model<Clipboard>,
    @Inject('ACCESS_CODE_GENERATOR')
    private readonly accessCodeGenerator: AccessCodeGeneratorSingleton,
  ) {}

  async findOne(code: string): Promise<Clipboard | null> {
    const query = await this.clipboard.findOne({ code: code });

    if (!query) return null;

    if (query.singleVisualization) {
      await this.clipboard.deleteOne({ code: code });
    } else if (
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
    clipboardDTO.code = this.accessCodeGenerator.generate();
    clipboardDTO.createdAt = new Date();

    const clipboardInstance = new this.clipboard(clipboardDTO);
    const query = await clipboardInstance.save();
    return query;
  }
}