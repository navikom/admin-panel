import {IStep} from "interfaces/IStep";
import {ChannelType} from "types/commonTypes";
import {IAttributesEventsPopper, IPopper} from "interfaces/IPopper";
import {IAttachment} from "interfaces/IAttachment";
import {IInAppVariant, IPushVariant, ISMSVariant} from "interfaces/IVariant";

export type ContentEmailPropsType = "fromEmail" | "fromName" | "subject";
export type ContentSMSPropsType = "sender" | "message";
export type ContentNotificationPropsType = "title" | "message";

export interface IRichText {
 emojiStore: IPopper;
 variablesPopperStore: IAttributesEventsPopper;
}

export interface IContentEmailView extends IRichText {
 fromName: string;
 fromEmail: string;
 subject: string;
 attachments: IAttachment[];

 jsonFile: {[key: string]: any};
 htmlFile: string;
 editorOpened: boolean;
 onInput(key: ContentEmailPropsType, value: string): void;
 onSave(jsonFile: any, htmlFile: any): void;
 onSend(htmlFile: any): void;
 onSaveAsTemplate(jsonFile: any): void;
 onError(errorMessage: string): void;
 closeEditor(): void;
 openEditor(): void;
 addAttachment(): void;
 deleteAttachment(index: number): void;
}

export interface IContentDevice extends IRichText {
 variant: ISMSVariant | IPushVariant | IInAppVariant;
 errors: {[key: string]: string};
 keyValue?: string[][] | null;

 hasError(key: ContentSMSPropsType | ContentNotificationPropsType): boolean;
 onInput(key: ContentSMSPropsType | ContentNotificationPropsType, value: string): void;
}

export interface IContentSMSView extends IContentDevice {
 phone: string;
}

export type ContentChannelsType = IContentEmailView | IContentDevice;

export interface IContentStep extends IStep {
 channel: ChannelType;
 variants: ContentChannelsType[];
 currentVariant: number;
 currentStore: ContentChannelsType;
 variantOptions: (string | number)[][];
 setCurrentVariant(index: number): void;
 addStore(): void;
 deleteStore(): void;
}
