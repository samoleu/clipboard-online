import { Module } from '@nestjs/common';
import { ClipboardController } from './controller/clipboard.controller';
import { ClipboardService } from './service/clipboard.service';
import { ClipboardRepository } from './repository/clipboard.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClipboardController],
  providers: [ClipboardService, ClipboardRepository],
})
export class ClipboardModule {}
