import { Module } from '@nestjs/common';
import { ClipboardModule } from './clipboard/clipboard.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ClipboardModule,
    MongooseModule.forRoot(
      'mongodb+srv://samuelferralves:FV3S06CLVTNVO1bg@cluster0.zy3o1bt.mongodb.net/?retryWrites=true&w=majority',
      // process.env.MONGODB_URI ??
      //   (() => {
      //     throw new Error('MONGODB_URI is not defined');
      //   })(),
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
