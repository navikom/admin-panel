import {EmailType, InAppType, PushType, SmsType} from "types/commonTypes";

export interface ISMSMessage {
  sender: string; // senderId from sms provider SSP(sms service provider)
  message: string;

  update(model: ISMSMessage): void;
}

interface IAttachment {
  attachmentId: number;
  path: string;
}

interface IEmailMessage {
  fromName: string;
  fromEmail: string;
  replyTo: string;
  subject: string;
  body: string;
  attachments: IAttachment[];
}

interface IVariantCommon {
  variantId: number;
  name: string;
}

export interface ISMSVariant extends IVariantCommon {
  channel: SmsType;
  provider: string; // SSP sms service provider
  data: ISMSMessage;
}

interface IEmailVariant extends IVariantCommon {
  channel: EmailType;
  provider: string; // ESP email service provider
  data: IEmailMessage;
}

interface IButton {
  label: string; // max 22 chars
  onClick: IOnClickAction;
  bgColor: string;
  color: string;
}

interface ICloseIcon {
  color: string;
}

interface IOnClickAction {
  android: string;
  ios: string;
}

interface IPersonalize {
  title: string; // max 18 chars
  description: string; // max 135 chars
  color: string;
  align: "left" | "center" | "right";
  wrapTitle: boolean;
}

interface IHeaderInAppLayout {
  description: string; // max 90 chars
  iconImage: string; // image 200x200 (1:1)
  bgImage: string; // image 640x160 (4:1)
  bgColor: string;
  color: string;
  closeButton: IButton | null; // max 12 chars
}

interface IFooterInAppLayout {
  iconImage: string; // image 200x200 (1:1)
  description: string; // max 90 chars
  closeIcon: ICloseIcon | null;
  color: string;
  bgColor: string;
  onClick: IOnClickAction;
}

interface IPopoutInAppLayout {
  personalize: IPersonalize;
  button: IButton;
  bgColor: string;
  image: string // 120x90 (4:3)
}

interface IClassicInAppLayout {
  personalize: IPersonalize;
  bgImage: string | null; // 320x640 (1:2)
  bgColor: string;
  primaryButton: IButton;
  secondaryButton: IButton | null;
  closeButton: IButton | null;
}

interface IFullScreenInAppLayout {
  personalize: IPersonalize;
  bgColor: string;
  closeIcon: ICloseIcon | null;
  bgImage: string; // 1080x2160 (1:2)
}

interface IBlockerInAppLayout {
  closeIcon: ICloseIcon | null;
  description: string; // max 90 chars
  bgImage: string; // 1080x2160 (1:2)
  button: IButton;
}

type LayoutInAppType = IHeaderInAppLayout | IFooterInAppLayout | IPopoutInAppLayout | IClassicInAppLayout |
  IFullScreenInAppLayout | IBlockerInAppLayout;

interface IInAppVariant extends IVariantCommon {
  channel: InAppType;
  layout: LayoutInAppType;
}

interface IBasic {
  title: string;
  message: string;
}

interface IAdvancedOptions {
  onClick: string;
  button1: IButton | null;
  button2: IButton | null;
}

interface ITextPushLayout {
  basic: IBasic;
}
interface IBannerPushLayout {
  basic: IBasic;
  image: string;
}

type LayoutPushType = ITextPushLayout | IBannerPushLayout;

export interface IPushVariant extends IVariantCommon {
  channel: PushType;
  layout: LayoutPushType;
  advancedOptionsAndroid: IAdvancedOptions | null;
  advancedOptionsIOS: IAdvancedOptions | null;
  keyValue: {[k: string]: any}[] | null;
}

export type VariantType = IEmailVariant | ISMSVariant | IInAppVariant | IPushVariant;
export type MobileVariantType = ISMSVariant | IPushVariant | IInAppVariant;
