export interface IBeefree {
  token: string;
  expires: Date;
}

export interface ISettings {
  loaded: boolean;
  cloudinaryPath?: string;
  cloudinaryFolder?: string;
  beefree?: IBeefree,
  beefreeError: string | null;
  systemEventsList?: string[];
  customEventsList?: string[];
  expressions?: string[];
}
