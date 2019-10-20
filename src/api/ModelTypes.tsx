
export type UserModel = {
  userId?: number;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdOn?: number;
  lastLogin?: number;
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
