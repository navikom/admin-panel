import { observable } from "mobx";
import { IDaily, IHourly, IMonthly, IRecurringRun } from "interfaces/ICampaign";
import { RECURRING_RUN_TYPE } from "models/Constants";
import { RunType } from "types/commonTypes";
import { DailyStore } from "models/Campaign/DailyStore";

export class RecurringRunStore implements IRecurringRun {
  @observable endDate: Date | null = null;
  @observable reoccur: IMonthly | IDaily | IHourly = new DailyStore();
  @observable startDate: Date = new Date();
  type: RunType = RECURRING_RUN_TYPE;
}
