//******** Routes *********//

import {
 DateExpressionTypesArray, ExpressionValueType,
 IncludingExpressionTypesArray,
 NumberExpressionTypesArray,
 StringExpressionTypesArray
} from "types/expressions";
import {EmailType, GenderExpressionTypesArray, InAppType, PushType, SmsType} from "types/commonTypes";
import {TestSegmentPropertyType} from "interfaces/ITestStep";

export const ROOT_ROUTE: string = "/";
export const PANEL_ROUTE: string = "/panel";
export const DASHBOARD_ROUTE: string = "/panel/dashboard";
export const EVENTS_USERS_LIST_ROUTE: string = "/panel/events-users";
export const USERS_LIST_ROUTE: string = "/panel/users";
export const APPS_LIST_ROUTE: string = "/panel/apps";
export const APP_LIST_ROUTE: string = "/panel/app";
export const LOGIN_ROUTE: string = "/login";
export const SIGN_UP_ROUTE: string = "/sign-up";
export const START_PAGE_ROUTE: string = "/start-page";
export const EMAIL_CAMPAIGNS_ROUTE: string = "/panel/campaigns/email";
export const SMS_CAMPAIGNS_ROUTE: string = "/panel/campaigns/sms";
export const IN_APP_CAMPAIGNS_ROUTE: string = "/panel/campaigns/in-app";
export const PUSH_CAMPAIGNS_ROUTE: string = "/panel/campaigns/push";

//********* Roles **********//
export const USER_ROLE: number = 1;
export const ADMIN_ROLE: number = 3;
export const SUPER_ADMIN_ROLE: number = 2;

//********* Sidebar Categories *********//
export const SIDEBAR_MAIN = "Main";
export const SIDEBAR_OTHER = "Other";
export const SIDEBAR_APPLICATION = "Application";
export const SIDEBAR_USER = "User";
export const SIDEBAR_ENGAGE = "Campaign";

//********* Campaign Channels **********//
export const SMS_CAMPAIGN = "SMS";
export const EMAIL_CAMPAIGN = "Email";
export const IN_APP_CAMPAIGN = "In App";
export const PUSH_CAMPAIGN = "Push";
export const EMAIL_CHANNEL: EmailType = 1;
export const SMS_CHANNEL: SmsType = 2;
export const IN_APP_CHANNEL: InAppType = 3;
export const PUSH_CHANNEL: PushType = 4;
export const CHANNEL_LIST = [[EMAIL_CHANNEL, EMAIL_CAMPAIGN], [SMS_CHANNEL, SMS_CAMPAIGN],
 [IN_APP_CHANNEL, IN_APP_CAMPAIGN], [PUSH_CHANNEL, PUSH_CAMPAIGN]];

//********* Campaign Run Type *****//
export const ONE_TIME_RUN_TYPE = 1;
export const TRIGGER_RUN_TYPE = 2;
export const RECURRING_RUN_TYPE = 3;
export const ONE_TIME_RUN = "One Time Run";
export const TRIGGER_RUN = "Trigger Run";
export const RECURRING_RUN = "Recurring Run";


//********* Campaign Steps ********//
export const AUDIENCE_CAMPAIGN_STEP = "Audience";
export const WHEN_TO_SEND_CAMPAIGN_STEP = "When to send";
export const CONTENT_CAMPAIGN_STEP = "Content";
export const CONVERSION_CAMPAIGN_STEP = "Conversion";
export const TEST_CAMPAIGN_STEP = "Test";
export const LAUNCH_CAMPAIGN_STEP = "Launch";

//######### Campaign Time Zones ****//
export const USERS_TIME_ZONE = "Users Time Zone";
export const APP_TIME_ZONE = "App Time Zone";

//********** Others ************//
export const ALL = "All";
export const VARIABLES = "VARIABLES";
export const ANDROID = "Android";
export const IOS = "IOS";

//********** Expressions *********//
export const AND = "and";
export const OR = "or";

//********** Days **************//
export const DaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//********** Time Periods ***********//
export const ConversionTimePeriods = ["Hours", "Days"];
export const TimePeriods = ["Minutes", "Days", "Weeks", "Months"];
export const OccurrenceTimePeriods = ["Day", "Week", "Month"];

//********** Period Amount *********//
export const PeriodAmount = {
 [TimePeriods[0]]: 1000 * 60,
 [TimePeriods[1]]: 1000 * 60 * 60,
 [TimePeriods[2]]: 1000 * 60 * 60 * 24,
 [TimePeriods[3]]: 1000 * 60 * 60 * 24 * 30
};

//********** Visitor Type *******//
export const VisitorTypeList = ["All Users", "New Users", "Returning", "No. of Sessions"];

//********* User Attributes Events **********//
export const UserOptions = ["User Attributes", "User System Events", "User Custom Events"];

//********* Test Property Names *****//
export const TestPropertyNames: TestSegmentPropertyType[] = ["userId", "email", "phone"];

//********* System Events Main Properties ******//
export const SystemEventsMainProperties = ["Date", "App", "Device", "Region"];

//********** Expressions ********//
export const NumberExpressions: NumberExpressionTypesArray =
  ["greater than", "less than", "equal to", "does not equal to",
   "is greater than or equal to", "is less than or equal to", "between", "not between", "one of", "none one of",
   "is empty", "is not empty"];
export const StringExpressions: StringExpressionTypesArray = ["equal to", "does not equal to", "one of", "none one of", "ends with",
 "does not end with", "starts with", "does not start with", "contains", "is empty", "is not empty"];
export const ContainsExpressions: IncludingExpressionTypesArray = ["include", "exclude"];
export const DateExpressions: DateExpressionTypesArray = ["before", "after", "withing"];
export const GenderExpressions: GenderExpressionTypesArray = ["Male", "Female"];
export const OccurExpressions = ["at least once", "not once", "amount"];

//********** User Attributes ******//
export const UserAttributes = ["userId", "createdAt", "updatedAt", "deletedAt", "lastEvent", "email", "referrer", "firstName",
 "lastName", "phone", "gender", "birthday", "emailVerified", "phoneVerified", "notificationEmail", "notificationSms",
 "subscription", "anonymous", "eventsCount", "lastLogin"];

//********** Reachability Expressions ******//
export const ReachabilityExpressions = ["reachableOn", "notReachableOn"];

//********** Device Properties **********//
export const DeviceProperties = ["appInstallationDate", "lastSeen", "totalTimeSpent", "appVersionName", "appId",
 "appVersionCode", "advertisingId", "apiVersion", "sdkVersion", "model", "locale"];
export const AndroidDeviceProperties = ["androidId", "manufacturer", "brand"];
export const IOSDeviceProperties = ["vendorId"];

//********** Expressions Map ********//
export const DateExpressionsMap = new Map<string, ExpressionValueType>([
 [DateExpressions[0], {key: "date", defaultValue: new Date()}],
 [DateExpressions[1], {key: "date", defaultValue: new Date()}],
 [DateExpressions[2], {keys: ["from", "to"], defaultValues: [new Date(), new Date()]}]
]);
export const NumberExpressionsMap: Map<string, ExpressionValueType | undefined> =
  new Map<string, ExpressionValueType | undefined>([
   [NumberExpressions[0], {key: "value", defaultValue: 0}],
   [NumberExpressions[1], {key: "value", defaultValue: 1}],
   [NumberExpressions[2], {key: "value", defaultValue: 1}],
   [NumberExpressions[3], {key: "value", defaultValue: 1}],
   [NumberExpressions[4], {key: "value", defaultValue: 1}],
   [NumberExpressions[5], {key: "value", defaultValue: 1}],
   [NumberExpressions[6], {keys: ["min", "max"], defaultValues: [0, 2]}],
   [NumberExpressions[7], {keys: ["min", "max"], defaultValues: [0, 2]}],
   [NumberExpressions[8], {key: "values", defaultValues: [1]}],
   [NumberExpressions[9], {key: "values", defaultValues: [1]}],
   [NumberExpressions[10], undefined],
   [NumberExpressions[11], undefined]
  ]);
export const StringExpressionsMap: Map<string, ExpressionValueType | undefined> =
  new Map<string, ExpressionValueType | undefined>([
   [StringExpressions[0], {key: "value", defaultValue: ""}],
   [StringExpressions[1], {key: "value", defaultValue: ""}],
   [StringExpressions[2], {key: "values", defaultValues: []}],
   [StringExpressions[3], {key: "value", defaultValues: []}],
   [StringExpressions[4], {key: "value", defaultValue: ""}],
   [StringExpressions[5], {key: "value", defaultValue: ""}],
   [StringExpressions[6], {key: "value", defaultValue: ""}],
   [StringExpressions[7], {key: "value", defaultValue: ""}],
   [StringExpressions[8], {key: "value", defaultValue: ""}],
   [StringExpressions[9], undefined],
   [StringExpressions[10], undefined]
  ]);
export const GenderExpressionsMap = new Map<string, undefined>([
 [GenderExpressions[0], undefined],
 [GenderExpressions[1], undefined]
]);

export const UserAttributeMap: Map<string, Map<string, ExpressionValueType | undefined> | undefined> =
  new Map([
   [UserAttributes[0], NumberExpressionsMap],
   [UserAttributes[1], DateExpressionsMap],
   [UserAttributes[2], DateExpressionsMap],
   [UserAttributes[3], DateExpressionsMap],
   [UserAttributes[4], DateExpressionsMap],
   [UserAttributes[5], StringExpressionsMap],
   [UserAttributes[6], NumberExpressionsMap],
   [UserAttributes[7], StringExpressionsMap],
   [UserAttributes[8], StringExpressionsMap],
   [UserAttributes[9], StringExpressionsMap],
   [UserAttributes[10], GenderExpressionsMap],
   [UserAttributes[11], DateExpressionsMap],
   [UserAttributes[12], undefined],
   [UserAttributes[13], undefined],
   [UserAttributes[14], undefined],
   [UserAttributes[15], undefined],
   [UserAttributes[16], undefined],
   [UserAttributes[17], undefined],
   [UserAttributes[18], NumberExpressionsMap],
   [UserAttributes[19], DateExpressionsMap]
  ]);

export const OccurExpressionsMap: Map<string, Map<string, ExpressionValueType | undefined> | undefined> = new Map([
 [OccurExpressions[0], undefined],
 [OccurExpressions[1], undefined],
 [OccurExpressions[2], NumberExpressionsMap]
]);

const DevicePropertiesArray: [string, Map<string, ExpressionValueType | undefined> | undefined][] = [
 [DeviceProperties[0], DateExpressionsMap],
 [DeviceProperties[1], DateExpressionsMap],
 [DeviceProperties[2], NumberExpressionsMap],
 [DeviceProperties[3], StringExpressionsMap],
 [DeviceProperties[4], StringExpressionsMap],
 [DeviceProperties[5], NumberExpressionsMap],
 [DeviceProperties[6], NumberExpressionsMap],
 [DeviceProperties[7], NumberExpressionsMap],
 [DeviceProperties[8], NumberExpressionsMap],
 [DeviceProperties[9], StringExpressionsMap],
 [DeviceProperties[10], StringExpressionsMap]
];

export const AndroidPropertiesMap: Map<string, Map<string, ExpressionValueType | undefined> | undefined> = new Map([
 ...DevicePropertiesArray,
 [AndroidDeviceProperties[0], NumberExpressionsMap],
 [AndroidDeviceProperties[1], StringExpressionsMap],
 [AndroidDeviceProperties[2], StringExpressionsMap]
]);

export const IOSPropertiesMap: Map<string, Map<string, ExpressionValueType | undefined> | undefined> = new Map([
 ...DevicePropertiesArray,
 [IOSDeviceProperties[0], NumberExpressionsMap]
]);
