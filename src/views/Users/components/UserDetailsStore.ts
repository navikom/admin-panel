import { action, computed, observable, when } from "mobx";
import moment from "moment";
import { IUser } from "interfaces/IUser";
import { UserStore } from "models/User/UserStore";
import validate from "validate.js";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import { Errors } from "models/Errors";
import { api, Apis } from "api";
import { ErrorHandler } from "utils/ErrorHandler";


validate.extend(validate.validators.datetime, {
  parse: function(value: Date) {
    return +moment.utc(value);
  },
  format: function(value: Date, options: {dateOnly: boolean}) {
    const format = options.dateOnly ? "MM/DD/YYYY" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  },
});

const constraints = {
  firstName: {
    length: {
      maximum: 50,
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeMoreThan, [Dictionary.defValue(DictionaryService.keys.firstName), "50"])}`
    }
  },
  lastName: {
    length: {
      maximum: 50,
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeMoreThan, [Dictionary.defValue(DictionaryService.keys.lastName), "50"])}`
    }
  },
  phone: {
    format: {
      pattern: /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/,
      message: `^${Dictionary.defValue(DictionaryService.keys.invalid, Dictionary.defValue(DictionaryService.keys.phone))}`
    },

  }
};

class UserDetailsStore extends Errors {
  @observable user?: IUser;
  @observable formUser: IUser = UserStore.emptyUser();
  @observable errors: {[k: string]: string} = {};
  @observable fetching: boolean = false;

  @computed get isDisabled() {
    return Object.keys(this.errors).length > 0 || this.hasError;
  }

  @action bindUser(user?: IUser) {
    this.user = user;
    if(user) {
      when(() => user.fullDataLoaded, () => this.formUser.updateForm(user));
    }
  }

  @action
  onInput(data: IUser) {
    try {
      this.errors = validate(data, constraints) || {};
      this.formUser.updateForm(data);
    } catch (e) {
      console.log("Validation error", e);
    }

  }

  @action async saveUser() {
    try {
      const data = await api(Apis.Main).user.update(this.formUser.userId, {
        firstName: this.formUser.firstName,
        lastName: this.formUser.lastName,
        birthday: this.formUser.birthday,
        phone: this.formUser.phone,
        subscription: this.formUser.subscription,
        notificationEmail: this.formUser.notificationEmail,
        notificationSms: this.formUser.notificationSms,
        gender: this.formUser.gender
      });
      this.user!.update(data);
    } catch (e) {
      this.setError(e.message);
      this.setTimeOut(() => this.setError(null), 10000);
    }
  }
}

export const UserDetails = new UserDetailsStore();
