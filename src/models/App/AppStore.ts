import { IApp } from "interfaces/IApp";
import { action, observable } from "mobx";

export class AppStore implements IApp {
  appId!: number;
  categoryId?: number;
  createdAt?: Date;
  deletedAt!: Date;

  @observable description?: string;
  @observable title?: string;
  @observable updatedAt?: Date;

  pk: string = "appId";

  get plainData() {
    const data = [
      ["Title", this.title || "—"],
    ];
    this.description && data.push(["Description", this.description]);
    return data;
  }

  @action
  update(model: IApp) {
    Object.assign(this, model);
    this.title = model.title;
    this.description = model.description;
    this.updatedAt = model.updatedAt;
  }

  static from(model: IApp) {
    const app = new AppStore();
    app.update(model);
    return app;
  }
}
