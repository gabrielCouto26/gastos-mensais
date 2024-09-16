import { Inject, Injectable } from '@nestjs/common';
import { IExpense } from './interface/expense.interface';
import { IDatabase } from 'src/shared/database.interface';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('InMemoryRepository')
    private repo: IDatabase<IExpense>,
  ) {}

  findAll(): IExpense[] {
    return this.repo.find();
  }

  findOne(id: string): IExpense | null {
    return this.repo.findOne({ id });
  }

  create(expense: IExpense): IExpense {
    return this.repo.save(expense);
  }
  update(id: string, params: IExpense): IExpense | null {
    const expense = this.repo.findOne({ id });
    if (!expense) return null;

    this.repo.delete(id);
    return this.repo.save(params);
  }

  remove(id: string): void {
    this.repo.delete(id);
  }
}
