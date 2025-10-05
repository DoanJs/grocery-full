export interface SettingModel {
  id: string;
  allowNotifications: boolean;
  emailNotifications: boolean;
  orderNotifications: boolean;
  generalNotifications: boolean;
  userId: string;
  createAt?: CreateAt;
  updateAt?: UpdateAt;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}