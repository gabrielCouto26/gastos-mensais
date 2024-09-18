import { Module } from '@nestjs/common';
import InMemoryRepository from './in-memory.repository';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import ExpensesRepository from './expenses.repository';
import { Connection } from 'mongoose';

const DB_TABLE = process.env.DB_TABLE || '';

const inMemoryFactory = {
  provide: 'InMemoryRepository',
  useFactory: () => {
    return new InMemoryRepository(DB_TABLE);
  },
};

const repositoryFactory = {
  provide: 'ExpensesRepository',
  useFactory: (connection: Connection) => {
    return new ExpensesRepository(connection);
  },
  inject: [getConnectionToken('expenses')],
};

@Module({
  providers: [inMemoryFactory, repositoryFactory],
  exports: ['InMemoryRepository', 'ExpensesRepository'],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/expenses', {
      connectionName: 'expenses',
    }),
  ],
})
export class DatabaseModule {}
