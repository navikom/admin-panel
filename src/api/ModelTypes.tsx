
export type UserModel = {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdOn?: number;
  lastLogin?: number;
  phone?: number;
  birthday?: Date;
  gender?: 'male' | 'female';
  anonymous: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
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
