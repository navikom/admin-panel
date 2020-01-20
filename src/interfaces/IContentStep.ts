import {IStep} from "interfaces/IStep";
import {ChannelType} from "types/commonTypes";
import {IAttributesEventsPopper, IPopper} from "interfaces/IPopper";
import {IAttachment} from "interfaces/IAttachment";

export type ContentEmailPropsType = "fromEmail" | "fromName" | "subject";
export interface IContentEmailView {
 fromName: string;
 fromEmail: string;
 subject: string;
 attachments: IAttachment[];
 variablesPopperStore: IAttributesEventsPopper;
 emojiStore: IPopper;
 jsonFile: {[key: string]: any};
 htmlFile: string;
 onInput(key: ContentEmailPropsType, value: string): void;
 onSave(jsonFile: any, htmlFile: any): void;
 onSend(htmlFile: any): void;
 onSaveAsTemplate(jsonFile: any): void;
 onError(errorMessage: string): void;
 editorOpened: boolean;
 closeEditor(): void;
 openEditor(): void;
 addAttachment(): void;
 deleteAttachment(index: number): void;
}
export interface IContentSMSView {}
export interface IContentInAppView {}
export interface IContentPushView {}

export type ContentChannelsType = IContentEmailView | IContentSMSView | IContentInAppView | IContentPushView;

export interface IContentStep extends IStep {
 channel: ChannelType;
 variants: ContentChannelsType[];
 currentVariant: number;
 currentStore: ContentChannelsType;
 setCurrentVariant(index: number): void;
 addStore(): void;
 deleteStore(): void;
}
