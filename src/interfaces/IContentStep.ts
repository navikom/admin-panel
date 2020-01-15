import {IStep} from "interfaces/IStep";
import {ChannelType} from "types/commonTypes";
import {IAttributesEventsPopper, IPopper} from "interfaces/IPopper";

export type ContentEmailPropsType = "fromEmail" | "fromName" | "subject";
export interface IContentEmailView {
 fromName: string;
 fromEmail: string;
 subject: string;
 variablesPopperStore: IAttributesEventsPopper;
 emojiStore: IPopper;
 onInput(key: ContentEmailPropsType, value: string): void;
}
export interface IContentSMSView {}
export interface IContentInAppView {}
export interface IContentPushView {}

export type ContentChannelsType = IContentEmailView | IContentSMSView | IContentInAppView | IContentPushView;

export interface IContentStep extends IStep {
 channel: ChannelType;
 store: ContentChannelsType;
}
