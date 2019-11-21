import { IApp } from "interfaces/IApp";

export class AppStore implements IApp {
  appId!: number;
  categoryId!: number;
  createdAt!: Date;
  deletedAt!: Date;
  description!: string;
  title!: string;
  updatedAt!: Date;

  constructor(model: IApp) {
    Object.assign(this, model);
  }

  static from(model: IApp) {
    return new AppStore(model);
  }
}
