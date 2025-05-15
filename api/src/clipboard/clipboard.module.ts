import { Module } from '@nestjs/common';
import { ClipboardController } from './controller/clipboard.controller';
import { ClipboardService } from './service/clipboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipboardSchema } from './model/clipboard.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Clipboard',
        schema: ClipboardSchema,
      },
    ]),
  ],
  controllers: [ClipboardController],
  providers: [ClipboardService],
})
export class ClipboardModule {}
