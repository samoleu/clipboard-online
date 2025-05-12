import { Module } from '@nestjs/common';
import { ClipboardModule } from './clipboard/clipboard.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ClipboardModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
