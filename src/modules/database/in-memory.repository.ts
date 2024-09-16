import { Injectable } from '@nestjs/common';
import { IDatabase } from 'src/shared/database.interface';

@Injectable()
export default class InMemoryRepository<T> implements IDatabase<T> {
  table: string;
  items: T[] = [];

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
      const items = this.getItems();
      const added = { ...items, item };
      this.setItems(added);
      return item;
    } catch (error) {
      throw new Error(
        `Failed to save Expense ${JSON.stringify(item)}. Original Error: ${error}`,
      );
    }
  }
  update(id: string, item: T): T {
    try {
      this.delete(id);
      const updated = { id, ...item };
      this.save(updated);
      return updated;
    } catch (error) {
      throw new Error(
        `Failed to update Expense ${id}. Original Error: ${error}`,
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

  private getItems() {
    return this.items;
  }

  private setItems(items: T[]) {
    this.items = items;
  }
}
