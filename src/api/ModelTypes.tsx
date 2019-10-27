
export type UserModel = {
  userId?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  createdOn?: number;
  lastLogin?: number;
  phone?: string;
  birthday?: Date;
  device?: any;
  gender?: 'male' | 'female';
  notificationEmail?: boolean;
  notificationSms?: boolean;
  subscription?: boolean;
  referrer?: number;
}

export type PictureModel = {
  pictureId: number;
  path: string;
  createdOn: number;
  name: string;
  categoryId: number;
};

export type LoginResultModel = {
  token: string;
  refreshToken: string;
  expires: number;
  user: UserModel;
};
