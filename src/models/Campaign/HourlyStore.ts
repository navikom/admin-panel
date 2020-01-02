import { IHourly } from "interfaces/ICampaign";
import { action, observable } from "mobx";

export class HourlyStore implements IHourly {
  @observable hours: number = 5;
  @observable minutes: number = 20;

  @action update(model: IHourly) {
    Object.assign(this, model);
  }
}
