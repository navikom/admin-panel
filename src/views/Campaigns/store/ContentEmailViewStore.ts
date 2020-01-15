import {action, observable} from "mobx";

// interfaces
import {ContentEmailPropsType, IContentEmailView} from "interfaces/IContentStep";

// stores
import {AttributeEventPopperStore} from "models/AttributeEventPopperStore";
import {IAttributesEventsPopper, IPopper} from "interfaces/IPopper";
import {EmojiPopperStore} from "models/EmojiPopperStore";


export class ContentEmailViewStore implements IContentEmailView {
 @observable fromEmail: string = "";
 @observable fromName: string = "";
 @observable subject: string = "";

 @observable variablesPopperStore: IAttributesEventsPopper = new AttributeEventPopperStore();
 @observable emojiStore: IPopper = new EmojiPopperStore();

 @action onInput(key: ContentEmailPropsType, value: string) {
  this[key] = value;
 }
}
