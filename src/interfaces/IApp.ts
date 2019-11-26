import { WithPrimaryKey } from "interfaces/WithPrimaryKey";

export interface IApp extends WithPrimaryKey{
  appId: number;
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  categoryId?: number;

  plainData?: string[][];
  update(model: IApp): void;
}
