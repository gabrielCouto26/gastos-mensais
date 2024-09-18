import { Inject, Injectable } from '@nestjs/common';
import { IExpense } from './interface/expense.interface';
import { IDatabase } from 'src/shared/database.interface';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

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

  async create(expense: CreateExpenseDto): Promise<IExpense> {
    if (!expense.date) expense.date = new Date();
    return await this.repo.save(expense as IExpense);
  }
  async update(id: string, params: UpdateExpenseDto): Promise<IExpense> | null {
    const expense = await this.repo.findOne({ id });
    if (!expense) return null;

    return await this.repo.update(id, params as IExpense);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
