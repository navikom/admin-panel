import { ITriggerRun } from "interfaces/ICampaign";
import { RunType } from "types/commonTypes";
import { TRIGGER_RUN_TYPE } from "models/Constants";
import { observable } from "mobx";

export class TriggerRunStore implements ITriggerRun {
  type: RunType = TRIGGER_RUN_TYPE;

  @observable eventName?: string;
  @observable sendAsOccurs: boolean = true;
  @observable startDate: Date = new Date();
  @observable endDate: Date | null = null;
}
