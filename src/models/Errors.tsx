import { action, computed, observable } from "mobx";

export class Errors {
  @observable error: string | null = null;

  @computed get hasError(): boolean {
    return this.error !== null;
  }

  @action setError(error: string | null = null) {
    this.error = error;
  }
}
