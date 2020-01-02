import { IDaily, IHourly } from "interfaces/ICampaign";
import { HourlyStore } from "models/Campaign/HourlyStore";
import { DaysOfWeek } from "models/Constants";
import { action, observable } from "mobx";

export class DailyStore implements IDaily {
  @observable day: string = DaysOfWeek[2];
  @observable time: IHourly = new HourlyStore();

  @action update(model: IDaily) {
    Object.assign(this, model);
  }
}
