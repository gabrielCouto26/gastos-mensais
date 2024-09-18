import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IDatabase } from 'src/shared/database.interface';
import { Expense, ExpenseSchema } from '../expenses/schemas/expense.schema';

@Injectable()
export default class ExpensesRepository implements IDatabase<Expense> {
  model: Model<Expense>;

  constructor(@InjectConnection('expenses') private connection: Connection) {
    this.model = this.connection.model('Expense', ExpenseSchema);
  }

  async find(): Promise<Expense[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new Error('Failed to list Expenses. Original Error: ' + error);
    }
  }
  async findOne(params: Record<string, any>): Promise<Expense> | undefined {
    try {
      return await this.model.findOne({ _id: params.id }).exec();
    } catch (error) {
      throw new Error(
        `Failed to find Expense with params ${JSON.stringify(params)}. Original Error: ${error}`,
      );
    }
  }
  async save(item: Expense): Promise<Expense> {
    try {
      return await this.model.create(item);
    } catch (error) {
      throw new Error(
        `Failed to save Expense ${JSON.stringify(item)}. Original Error: ${error}`,
      );
    }
  }
  async update(id: string, item: Expense): Promise<Expense> {
    try {
      return await this.model
        .findByIdAndUpdate({ _id: id }, item, { new: true })
        .exec();
    } catch (error) {
      throw new Error(
        `Failed to delete Expense ${id}. Original Error: ${error}`,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.model.findByIdAndDelete({ _id: id }).exec();
    } catch (error) {
      throw new Error(
        `Failed to delete Expense ${id}. Original Error: ${error}`,
      );
    }
  }
}
