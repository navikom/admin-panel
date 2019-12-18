import { WithPrimaryKey } from "interfaces/WithPrimaryKey";
import { ChannelType } from "interfaces/ICampaign";
import {
  IAfter,
  IAtLeastOnce,
  IBefore,
  IOnce,
  IWithing, NumberExpressionType
} from "interfaces/IExpressions";
import { IAndroidDevice, IIOSDevice, ISegmentDevice } from "interfaces/ISegmentDevice";
import { AllUsersType, NewUsersType, ReturningType } from "types/commonTypes";
import { AndType, OrType, AnyType, NoneType } from "types/expressions";

interface INumberOfSessions {
  condition: string;
  value: number;
}

interface IGeo {
  switch: AnyType | NoneType;
  countries: string[];
  cities: string[];
}

interface IAttribute {
  property: string;
  is: string;
  typeValue: string;
  value: string | number | boolean;
}

interface IUserIDs {
  is: string;
  value: number | number[] | boolean;
}

interface IReachability {
  on: boolean;
  value: ChannelType;
}

type AttributeType = IAttribute | (IAttribute | AndType | OrType)[] | null;

export type VisitorType = AllUsersType | NewUsersType | ReturningType | INumberOfSessions;

interface IUserTab {
  visitorType: VisitorType;
  lastSeen: IBefore | IAfter | IWithing;
  geo: IGeo;
  attributes: AttributeType;
  userIDs: IUserIDs;
  reachability: IReachability;
}

type NumberOfOccursType = NumberExpressionType;

interface IBehaviorEvent {
  name: string;
  attributes: AttributeType;
  occurs: IAtLeastOnce | IOnce | NumberOfOccursType;
}

type BehaviorType = IBehaviorEvent | (IBehaviorEvent | AndType | OrType)[] | null;

interface IBehaviorTab {
  usersWhoDidEvents: BehaviorType;
  and: boolean;
  usersWhoDidNotDoEvents: BehaviorType;
}

interface ITechnologyTab {
  android: IAndroidDevice | null;
  ios: IIOSDevice | null;
}

export interface ISegment extends WithPrimaryKey {
  segmentId: number;
  name: string;
  pk: string;
  userTab: IUserTab;
  behaviorTab: IBehaviorTab;
  technologyTab: ITechnologyTab;
}
