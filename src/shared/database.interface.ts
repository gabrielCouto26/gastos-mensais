export interface IDatabase<T> {
  find(): T[];
  findOne(params: Record<string, any>): T | null;
  save(item: T): T;
  update(id: string, item: T): T;
  delete(id: string): void;
}
