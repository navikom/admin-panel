import {IPushVariant} from "interfaces/IVariant";
import {PushVariantStore} from "models/Campaign/Push/PushVariantStore";
import {ContentDeviceViewStore} from "views/Campaigns/store/ContentDeviceViewStore";

export class ContentPushViewStore extends ContentDeviceViewStore {

 constructor(variant: IPushVariant = new PushVariantStore()) {
  super(variant);
 }

}
