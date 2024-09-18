export interface IDatabase<T> {
  find(): T[] | Promise<T[]>;
  findOne(params: Record<string, any>): T | Promise<T> | undefined;
  save(item: T): T | Promise<T>;
  delete(id: string): void | Promise<void>;
  update?(id: string, item: T): T | Promise<T>;
}
