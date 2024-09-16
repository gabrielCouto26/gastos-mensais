export interface IDatabase<T> {
  find(): T[];
  findOne(params: Record<string, any>): T | undefined;
  save(item: T): T;
  delete(id: string): void;
}
