export interface IEntityService<T> {
  create(data: any): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}
