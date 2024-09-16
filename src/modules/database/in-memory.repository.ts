import { Injectable } from '@nestjs/common';
import { IDatabase } from 'src/shared/database.interface';

@Injectable()
export default class InMemoryRepository<T> implements IDatabase<T> {
  private items: T[] = [];
  table: string;

  constructor(table: string) {
    this.table = table;
  }

  find(): T[] {
    try {
      return this.getItems();
    } catch (error) {
      throw new Error('Failed to list Expenses. Original Error: ' + error);
    }
  }
  findOne(params: Record<string, any>): T | null {
    try {
      const items: T[] = this.getItems();
      return items.find((item: T) => {
        return Object.entries(params).every(
          ([key, value]) => item[key] === value,
        );
      });
    } catch (error) {
      throw new Error(
        `Failed to find Expense with params ${JSON.stringify(params)}. Original Error: ${error}`,
      );
    }
  }
  save(item: T): T {
    try {
      const newItem = {
        id: this.autoIncrement(),
        ...item,
      };
      this.addItem(newItem);
      return newItem;
    } catch (error) {
      throw new Error(
        `Failed to save Expense ${JSON.stringify(item)}. Original Error: ${error}`,
      );
    }
  }
  delete(id: string): void {
    try {
      const items = this.getItems();
      const filtered = items.filter((item: T) => item['id'] != id);
      this.setItems(filtered);
    } catch (error) {
      throw new Error(
        `Failed to delete Expense ${id}. Original Error: ${error}`,
      );
    }
  }

  private getItems(): T[] {
    return this.items;
  }

  private setItems(items: T[]): void {
    this.items = items;
  }

  private addItem(item: T): void {
    this.items.push(item);
  }

  private autoIncrement(): string {
    if (!this.items.length) return '1';
    const newId = Number(this.items[this.items.length - 1]['id']) + 1;
    return newId.toString();
  }
}
