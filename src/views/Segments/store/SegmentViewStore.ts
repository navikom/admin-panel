import { action, computed, observable } from "mobx";

// models
import { Errors } from "models/Errors";
import { SegmentStore } from "models/Segment/SegmentStore";
import { Segments } from "models/Segment/SegmentsStore";
import {
  ALL, CHANNEL_LIST,
  ContainsExpressions,
  DateExpressions,
  NumberExpressions, ReachabilityExpressions,
  StringExpressions,
  VisitorTypeList
} from "models/Constants";

// interfaces
import { ISegment } from "interfaces/ISegment";
import {
  DateExpressionTypesArray,
  DateTypes,
  NumberExpressionTypesArray,
} from "types/expressions";
import { ISegmentRegionView } from "interfaces/ISegmentRegionView";
import { SegmentRegionViewStore } from "views/Segments/store/SegmentRegionViewStore";
import { SegmentAttributeViewStore } from "views/Segments/store/SegmentAttributeViewStore";
import { SegmentEventViewStore } from "views/Segments/store/SegmentEventViewStore";
import { SegmentTechnologyViewStore } from "views/Segments/store/SegmentTechnologyViewStore";

class SegmentViewStore extends Errors {
  visitorTypes: Map<string, NumberExpressionTypesArray | undefined> = new Map([
    [VisitorTypeList[0], undefined],
    [VisitorTypeList[1], undefined],
    [VisitorTypeList[2], undefined],
    [VisitorTypeList[3], NumberExpressions]
  ]);
  lastSeenExpressions: DateExpressionTypesArray = DateExpressions;
  reachabilityExpressions: string[] = ReachabilityExpressions;
  channelList: (number | string)[][] = CHANNEL_LIST;
  regionViewStore?: ISegmentRegionView;

  @observable segment?: ISegment;

  @computed get visitorTypeValues() {
    const userTab = this.segment!.userTab;
    const value = userTab!.visitorType.value;
    const values = userTab!.visitorType.values;
    const min = userTab!.visitorType.min;
    const max = userTab!.visitorType.max;
    return {
      value, values, min, max
    };
  }

  @computed get lastSeenValues() {
    const userTab = this.segment!.userTab;
    const values: { date?: Date, from?: Date, to?: Date } = {};
    if (!userTab || (userTab && !userTab.lastSeen)) {
      return values;
    }
    userTab.lastSeen!.date && (values.date = userTab.lastSeen!.date);
    if(userTab.lastSeen!.from) {
      values.from = userTab.lastSeen!.from;
      values.to = userTab.lastSeen!.to;
    }
    return values;
  }

  @computed get lastSeenValue() {
    const userTab = this.segment!.userTab;
    return userTab!.lastSeen ? userTab!.lastSeen.is : "";
  }

  @computed get reachabilityOn() {
    const userTab = this.segment!.userTab;
    return userTab!.reachability === null ? ""
      : userTab!.reachability!.on ? this.reachabilityExpressions[0] : this.reachabilityExpressions[1];
  }

  @computed get reachabilityValue() {
    const userTab = this.segment!.userTab;
    return this.channelList.find((e) => userTab!.reachability!.value === e[0])![1];
  }

  get channelNames() {
    return this.channelList.map((e) => e[1]);
  }

  @action setSegment(segmentId: number) {
    this.segment = segmentId === 0
      ? SegmentStore.newSegment()
      : Segments.getById(segmentId);
    this.clearAll();
    this.regionViewStore = new SegmentRegionViewStore();
  }

  @action updateVisitorValue(data: string | string[], key: "values" | "value" | "min" | "max") {
    const value: number | number[] = Array.isArray(data) ? data.map((e: string) => Number(e)) : Number(data);
    this.segment!.userTab!.updateVisitorConditionValue(value, key);
  }

  @action clearVisitorType() {
    this.segment!.userTab!.updateVisitor(VisitorTypeList[0]);
  }

  @action updateLastSeenExpression(value: string) {
    this.segment!.userTab!.updateLastSeen(value as DateTypes);
  }

  @action updateLastSeenValue(date: Date, key: "from" | "to") {
    this.segment!.userTab!.updateLastSeenValue(date, key);
  }

  @action clearLastSeen() {
    this.segment!.userTab!.updateLastSeen();
  }

  @action clearGeo() {
    SegmentRegionViewStore.clear();
  }

  @action clearAttributes() {
    SegmentAttributeViewStore.clear();
  }

  @action clearBehaviorEvents(didEvents: boolean) {
    if(didEvents) {
      SegmentEventViewStore.clearDidEvents();
    } else {
      SegmentEventViewStore.clearDidNotDoEvents();
    }
  }

  @action clearReachability() {
    this.segment!.userTab!.clearReachability();
  }

  @action saveSegment() {

  }

  @action clearAll() {
    this.segment!.userTab!.clear();
    SegmentRegionViewStore.clear();
    SegmentAttributeViewStore.clear();
    SegmentEventViewStore.clear();
    SegmentTechnologyViewStore.clear();
  }
}

export default new SegmentViewStore();
