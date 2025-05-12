import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';

@Module({
  exports: [DatabaseProvider],
  providers: [DatabaseProvider],
})
export class DatabaseModule {}
