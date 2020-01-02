import {
  AttributeType,
  IGeo,
  INumberOfSessions,
  IReachability,
  IUserIDs,
  IUserTab
} from "interfaces/ISegment";
import { action, observable } from "mobx";
import { DateExpressions, NumberExpressions, VisitorTypeList } from "models/Constants";
import { DateTypes, NumberTypes } from "types/expressions";
import { IDateFilter } from "interfaces/IFilters";

export class UserTabStore implements IUserTab {
  @observable attributes: AttributeType = null;
  @observable geo: null = null;
  @observable lastSeen: IDateFilter | null = null;
  @observable reachability: IReachability | null = null;
  @observable userIDs: IUserIDs | null = null;
  @observable visitorType: INumberOfSessions = { name: VisitorTypeList[0] };

  @action updateVisitor(name: string) {
    this.visitorType = name === VisitorTypeList[3] ?
      { name, is: NumberExpressions[10] } :
      { name };
  }

  @action updateVisitorCondition(is: NumberTypes) {
    this.visitorType = {
      name: this.visitorType.name,
      is
    };
    (NumberExpressions[0] === is || NumberExpressions[1] === is || NumberExpressions[2] === is ||
      NumberExpressions[3] === is || NumberExpressions[4] === is || NumberExpressions[5] === is) && (this.visitorType.value = 0);
    (NumberExpressions[8] === is || NumberExpressions[9] === is) && (this.visitorType.values = []);
    if (NumberExpressions[6] === is || NumberExpressions[7] === is) {
      this.visitorType.min = 0;
    }
  }

  @action updateVisitorConditionValue(value: number | number[], key: "values" | "value" | "min" | "max") {
    if (!this.visitorType[key] === undefined) return;

    // @ts-ignore
    this.visitorType[key] = value;
    key === "min" && (this.visitorType.max = this.visitorType.min! + 2);
  }

  @action updateLastSeen(is?: DateTypes) {
    if (!is || is.length === 0) {
      this.lastSeen = null;
    } else {
      this.lastSeen = {
        is
      };
      (is === DateExpressions[0] || is === DateExpressions[1]) && (this.lastSeen.date = new Date());
      if (is === DateExpressions[2]) {
        this.lastSeen.from = new Date();
        this.lastSeen.to = new Date();
      }
    }
  }

  @action updateLastSeenValue(date: Date, key: "date" | "from" | "to") {
    this.lastSeen![key] = date;
  }

  @action clear() {
    this.attributes = null;
    this.geo = null;
    this.lastSeen = null;
    this.reachability = null;
    this.userIDs = null;
    this.visitorType = { name: VisitorTypeList[0] };
  }
}
