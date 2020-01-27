import {action, observable} from "mobx";
import validate from "validate.js";

// services
import {Dictionary, DictionaryService} from "services/Dictionary/Dictionary";

// interfaces
import {ContentSMSPropsType, IContentSMSView} from "interfaces/IContentStep";
import {ISMSMessage, ISMSVariant} from "interfaces/IVariant";
import {IAttributesEventsPopper, IPopper} from "interfaces/IPopper";

// models
import {AttributeEventPopperStore} from "models/AttributeEventPopperStore";
import {EmojiPopperStore} from "models/EmojiPopperStore";
import {SMSVariantStore} from "models/Campaign/Sms/SMSVariantStore";

export class ContentSMSViewStore implements IContentSMSView {
 constraints: {[key: string]: any};

 @observable phone!: string;
 @observable variant: ISMSVariant;
 @observable variablesPopperStore: IAttributesEventsPopper = new AttributeEventPopperStore();
 @observable emojiStore: IPopper = new EmojiPopperStore();
 @observable errors!: {[key: string]: string};

 constructor(variant: ISMSVariant = new SMSVariantStore()) {
  this.variant = variant;
  this.constraints = {
   sender: {
    presence: {
     message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, DictionaryService.keys.sender)}`
    },
    length: {
     minimum: 2,
     maximum: 100,
     message: `^${Dictionary.defValue(DictionaryService.keys.cantBeMoreAndLessThan, [DictionaryService.keys.sender, "100", "2"])}`
    }
   },
   message: {
    presence: {
     message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, DictionaryService.keys.message)}`
    },
    length: {
     minimum: 2,
     maximum: 400,
     message: `^${Dictionary.defValue(DictionaryService.keys.cantBeMoreAndLessThan, [DictionaryService.keys.message, "400", "2"])}`
    }
   }
  };
 }

 hasError(key: ContentSMSPropsType) {
  return this.errors !== undefined && this.errors[key] !== undefined;
 }

 @action onInput = (key: ContentSMSPropsType, value: string) => {
  const sms = this.variant.data;
  this.errors = validate(Object.assign({sender: sms.sender, message: sms.message}, {[key]: value}), this.constraints);
  sms.update({[key]: value} as unknown as ISMSMessage);
 };

}
