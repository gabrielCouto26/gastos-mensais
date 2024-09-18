import { Inject, Injectable } from '@nestjs/common';
import { IExpense } from './interface/expense.interface';
import { IDatabase } from 'src/shared/database.interface';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('ExpensesRepository')
    private repo: IDatabase<IExpense>,
  ) {}

  async findAll(): Promise<IExpense[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<IExpense> | undefined {
    return await this.repo.findOne({ id });
  }

  async create(expense: IExpense): Promise<IExpense> {
    return await this.repo.save(expense);
  }
  async update(id: string, params: IExpense): Promise<IExpense> | null {
    const expense = await this.repo.findOne({ id });
    if (!expense) return null;

    this.repo.delete(id);
    return await this.repo.save(params);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
