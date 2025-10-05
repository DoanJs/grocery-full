export interface UserModel {
  id: string;
  createAt: CreateAt;
  email: string;
  phone: string
  name: string;
  updateAt: UpdateAt;
  url: string;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}
