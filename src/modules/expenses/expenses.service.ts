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

  findOne(id: number): IExpense | null {
    return this.repo.findOne({ id });
  }

  create(expense: IExpense): IExpense {
    return this.repo.save(expense);
  }
  update(id: number, params: IExpense): IExpense | null {
    const expense = this.repo.findOne({ id });
    if (!expense) return null;

    const updated = this.repo.update(id.toString(), params);
    return this.repo.save(updated);
  }

  remove(id: number): void {
    this.repo.delete(id.toString());
  }
}
