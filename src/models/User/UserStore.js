import {types} from "mobx-state-tree";

/**
 * User model
 *
 */
const UserStore = types.model("UserStore", {
  authorized: false
})
  .actions(self => ({
    setAuthorized(value) {
      self.authorized = value;
    }
  }));

export const User = UserStore.create();
