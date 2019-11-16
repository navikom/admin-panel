import { Errors } from "models/Errors";
import { action, computed, observable } from "mobx";
import { api, Apis } from "api";
import React from "react";
import { WithPrimaryKey } from "interfaces/WithPrimaryKey";
import { IPagination } from "interfaces/IPagination";

type ApiMethodsInterface = "user" | "event";
type RequestTypesInterface = "pagination";

export class Pagination<T extends WithPrimaryKey> extends Errors implements IPagination {
  started: boolean = false;
  page: number = 0;
  pageSize: number = 20;
  apiMethod: ApiMethodsInterface;
  requestMethod: RequestTypesInterface;
  additionalParams: any;
  pk: string;
  fetching: boolean = false;

  @observable allFetched: boolean = false;
  @observable items: T[];
  @observable count: number = 0;

  @computed get isAllFetched(): boolean {
    return this.allFetched;
  }

  @computed get size() {
    return this.items.length;
  }

  getById(id: number): T | undefined {
    return computed(() => this.items.find((e: any) => e[this.pk] === id)).get();
  }

  has(id?: number): boolean {
    return computed(() => this.items.some((e: any) => id === e[this.pk])).get();
  }

  constructor(pKey: string, apiMethod: ApiMethodsInterface, size: number,
              requestMethod: RequestTypesInterface = "pagination", additionalParams?: any) {
    super();
    this.pk = pKey;
    this.apiMethod = apiMethod;
    this.pageSize = size;
    this.requestMethod = requestMethod;
    this.additionalParams = additionalParams;
    this.items = new Array<T>();
  }

  setPageSize(size: number) {
    this.pageSize = size;
  }

  @action setStarted(value: boolean = true) {
    this.started = value;
  }

  @action setPageData(data: any) {
    this.page = this.page + 1;
    this.count = data.count;
    if (data.items.length < this.pageSize || this.size + data.items.length >= data.count) {
      this.allFetched = true;
    }
  }

  @action setCount(count: number) {
    this.count = count;
  }

  @action
  async fetchItems() {
    if (this.started) {
      return false;
    }
    this.setStarted();
    return this.getNext();
  }

  @action push(data: any) {
    throw "Redefine in children";
  }

  @action
  async getNext(): Promise<boolean> {
    if (this.isAllFetched) return true;
    if (this.additionalParams) {
      const response = await api(Apis.Main)[this.apiMethod][this.requestMethod](this.page, this.pageSize, this.additionalParams);
      this.setPageData(response);
      this.push(response.items);
    } else {
      const response = await api(Apis.Main)[this.apiMethod][this.requestMethod](this.page, this.pageSize);
      this.setPageData(response);
      this.push(response.items);
    }

    return true;
  }

  @action reachedBottom = async (top: number, height: number) => {
    if (this.fetching) return;
    let paddingToBottom = 15;
    if (top >= height - paddingToBottom) {
      if (!this.fetching) {
        this.setFetching();
        try {
          await this.getNext();
        } catch (e) {
          this.setError(e.message);
        }
        this.setFetching(false);
      }
    }
  };

  @action
  setFetching(value: boolean = true) {
    this.fetching = value;
  }

  @action clear() {
    this.items = new Array<T>();
    this.started = false;
    this.page = 0;
    this.count = 0;
    this.allFetched = false;
  }
}
