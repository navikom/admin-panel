import { Pagination } from "models/Pagination";

export interface IChannelCampaigns<T> extends Pagination<T>{
  title: string;
}
