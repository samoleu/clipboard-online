import { DataSource, Repository } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Clipboard } from '../model/clipboard.model';

export const ClipboardRepository: Provider<Repository<Clipboard>> = {
  provide: 'CLIPBOARD_REPOSITORY',
  useFactory: (dataSource: DataSource) => {
    return dataSource.getRepository(Clipboard);
  },
  inject: ['DATA_SOURCE'],
};
