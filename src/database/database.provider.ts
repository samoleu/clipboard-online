import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';

export const DatabaseProvider: Provider<DataSource> = {
  provide: 'DATA_SOURCE',
  useFactory: () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/../**/*.model{.ts,.js}'],
      synchronize: true,
    });

    return dataSource.initialize();
  },
};
