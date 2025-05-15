import { Module } from '@nestjs/common';
import { ClipboardModule } from './clipboard/clipboard.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ClipboardModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI ??
        (() => {
          throw new Error('MONGODB_URI is not defined');
        })(),
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
