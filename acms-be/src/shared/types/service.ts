export interface IEntityService<T> {
  create(data: any): Promise<T>;
  findAll(isDeleted?: boolean): Promise<T[]>;
  findOne(id: string, isDeleted?: boolean): Promise<T | null>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}
