//******** Routes *********//

import {
  DateExpressionTypesArray, ExpressionValueType,
  IncludingExpressionTypesArray,
  NumberExpressionTypesArray,
  StringExpressionTypesArray
} from "types/expressions";
import { GenderExpressionTypesArray } from "types/commonTypes";

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

//********* Channels **************//
export const EMAIL_CHANNEL = 1;
export const SMS_CHANNEL = 2;
export const IN_APP_CHANNEL = 3;
export const PUSH_CHANNEL = 4;

//********* Campaign Run Type *****//
export const ONE_TIME_RUN_TYPE = 1;
export const TRIGGER_RUN_TYPE = 2;
export const RECURRING_RUN_TYPE = 3;

//********* Campaign Steps ********//
export const AUDIENCE_CAMPAIGN_STEP = "Audience";
export const WHEN_TO_SEND_CAMPAIGN_STEP = "When to send";
export const CONTENT_CAMPAIGN_STEP = "Content";
export const CONVERSION_CAMPAIGN_STEP = "Conversion";
export const TEST_CAMPAIGN_STEP = "Test";
export const LAUNCH_CAMPAIGN_STEP = "Launch";

//********** Others ************//
export const ALL = "All";

//********** Expressions *********//
export const AND = "and";
export const OR = "or";

//********** Days **************//
export const DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//********** Visitor Type *******//
export const VisitorTypeList = ["All Users", "New Users", "Returning", "No. of Sessions"];

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

//********** User Attributes ******//
export const UserAttributes = ["createdAt", "updatedAt", "deletedAt", "lastEvent", "email", "referrer", "firstName",
  "lastName", "phone", "gender", "birthday", "emailVerified", "phoneVerified", "notificationEmail", "notificationSms",
  "subscription", "anonymous", "eventsCount", "lastLogin"];

//********** Expressions Map ********//
export const DateExpressionsMap = new Map<string, ExpressionValueType>([
  [DateExpressions[0], { key: "date", defaultValue: new Date() }],
  [DateExpressions[1], { key: "date", defaultValue: new Date() }],
  [DateExpressions[2], { keys: ["from", "to"], defaultValues: [new Date(), new Date()] }]
]);
export const NumberExpressionsMap: Map<string, ExpressionValueType | undefined> =
  new Map<string, ExpressionValueType | undefined>([
    [NumberExpressions[0], { key: "value", defaultValue: 0 }],
    [NumberExpressions[1], { key: "value", defaultValue: 1 }],
    [NumberExpressions[2], { key: "value", defaultValue: 1 }],
    [NumberExpressions[3], { key: "value", defaultValue: 1 }],
    [NumberExpressions[4], { key: "value", defaultValue: 1 }],
    [NumberExpressions[5], { key: "value", defaultValue: 1 }],
    [NumberExpressions[6], { keys: ["min", "max"], defaultValues: [0, 2] }],
    [NumberExpressions[7], { keys: ["min", "max"], defaultValues: [0, 2] }],
    [NumberExpressions[8], { key: "values", defaultValues: [1] }],
    [NumberExpressions[9], { key: "values", defaultValues: [1] }],
    [NumberExpressions[10], undefined],
    [NumberExpressions[11], undefined]
  ]);
export const StringExpressionsMap: Map<string, ExpressionValueType | undefined> =
  new Map<string, ExpressionValueType | undefined>([
    [StringExpressions[0], { key: "value", defaultValue: "" }],
    [StringExpressions[1], { key: "value", defaultValue: "" }],
    [StringExpressions[2], { key: "values", defaultValues: [] }],
    [StringExpressions[3], { key: "value", defaultValues: [] }],
    [StringExpressions[4], { key: "value", defaultValue: "" }],
    [StringExpressions[5], { key: "value", defaultValue: "" }],
    [StringExpressions[6], { key: "value", defaultValue: "" }],
    [StringExpressions[7], { key: "value", defaultValue: "" }],
    [StringExpressions[8], { key: "value", defaultValue: "" }],
    [StringExpressions[9], undefined],
    [StringExpressions[10], undefined],
  ]);
export const GenderExpressionsMap = new Map<string, undefined>([
  [GenderExpressions[0], undefined],
  [GenderExpressions[1], undefined]
]);

export const UserAttributeNames: Map<string, Map<string, ExpressionValueType | undefined> | undefined> =
  new Map([
    [UserAttributes[0], DateExpressionsMap],
    [UserAttributes[1], DateExpressionsMap],
    [UserAttributes[2], DateExpressionsMap],
    [UserAttributes[3], DateExpressionsMap],
    [UserAttributes[4], StringExpressionsMap],
    [UserAttributes[5], NumberExpressionsMap],
    [UserAttributes[6], StringExpressionsMap],
    [UserAttributes[7], StringExpressionsMap],
    [UserAttributes[8], StringExpressionsMap],
    [UserAttributes[9], GenderExpressionsMap],
    [UserAttributes[10], DateExpressionsMap],
    [UserAttributes[11], undefined],
    [UserAttributes[12], undefined],
    [UserAttributes[13], undefined],
    [UserAttributes[14], undefined],
    [UserAttributes[15], undefined],
    [UserAttributes[16], undefined],
    [UserAttributes[17], NumberExpressionsMap],
    [UserAttributes[18], DateExpressionsMap]
  ]);
