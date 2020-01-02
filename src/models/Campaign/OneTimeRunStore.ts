import { IOneTimeRun } from "interfaces/ICampaign";
import { ONE_TIME_RUN_TYPE } from "models/Constants";
import { RunType } from "types/commonTypes";
import { action, observable } from "mobx";

export class OneTimeRunStore implements IOneTimeRun {
  type: RunType = ONE_TIME_RUN_TYPE;

  @observable appTimezone: boolean = false;
  @observable later: Date = new Date();
  @observable now: boolean = true;
  @observable userTimezone: boolean = false;

  @action update(model: IOneTimeRun) {
    Object.assign(this, model);
  }
}
