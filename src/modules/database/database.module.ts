import { Module } from '@nestjs/common';
import InMemoryRepository from './in-memory.repository';

const DB_TABLE = process.env.DB_TABLE || '';

const inMemoryFactory = {
  provide: 'InMemoryRepository',
  useFactory: () => {
    return new InMemoryRepository(DB_TABLE);
  },
};

@Module({
  providers: [inMemoryFactory],
  exports: ['InMemoryRepository'],
})
export class DatabaseModule {}
